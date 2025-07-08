import nodemailer from 'nodemailer';

const sendOtp=async(email,otp)=>{
    try {
        const transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        });

        const mailOptions={
            from:'noreply@taskapp.com',
            to:email,
            subject:'Your OTP for TaskApp',
            text:`Your OTP is: ${otp}`,
        };

        const info=await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}:`,info.response);
    } catch (error) {
        console.log('Error while sending OTP: ',error);
        throw new Error('OTP send failed');
    }
};

export default sendOtp;