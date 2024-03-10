const nodemailer = require("nodemailer"); 

module.exports.transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL, 
        pass: process.env.NODEMAILER_PASSWORD,
    },
});

module.exports.createEmailTemplate = (user) => {
  
    return `<div style="margin: 24px; border-color:#1400FF; border-width: medium; border-style: solid; padding-left: 25px; height: 190px; width: 350px">
    <h1>Welcome to Achieve It 🎉</h1>
    <p>Hi ${user.username} 👋🏻, thank you for join our comunity!</p>
    <p>Click on the following link to validate your email</p>
    <a href="http://localhost:5173/activate/${user.activationToken}" style="background-color: #1400FF;color: white;padding: 8px 12px;border-radius: 20px;text-decoration: none;">
        Activate
    </a>
</div>`;
}
