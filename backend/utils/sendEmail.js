const nodemailer=require("nodemailer");

const sendEmail=async(options)=>{

    try {
        
        const transporter = nodemailer.createTransport({
            // host: 'smtp.gmail.com',
            // port: 587, // or 465 for SSL
            service:process.env.SMPT_SERVICE,
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: options.email,
            subject: options.subject,
            html: options.html
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Email could not be sent");
    }
}

module.exports=sendEmail