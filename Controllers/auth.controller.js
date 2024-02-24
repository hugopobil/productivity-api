const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/User.model');

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;

    const LOGIN_ERROR_MESSAGE = 'Email or password invalid';

    const errorFn = () => next(createError(StatusCodes.BAD_REQUEST, LOGIN_ERROR_MESSAGE)); 

    if (!email || !password) {
        return errorFn();
    }
    console.log(req.body)
    //Aquí se busca si ya existe una cuenta con ese email.
    User.findOne({ email })
        .then(user => {
            if (!user) {
                errorFn();
            } else {
                //Aquí se compara la password 
                return user.checkPassword(password)
                 .then(match => {
                    if (!match) {
                        errorFn();
                    } else {
                        //Se crea el token y se envia

                        const token = jwt.sign(
                            { id: user.id },
                            process.env.JWT_SECRET || 'test',
                            {expiresIn: '1d' }
                        )
                        res.json({ accessToken: token });
                    }
                 })
            }
        })
        .catch(next)
}

module.exports.logout = (req, res, next) => {
    req.session.destroy();
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
    res.redirect('/login')
}