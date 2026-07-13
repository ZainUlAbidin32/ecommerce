import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

export const sendEmail = async ({email, token, emailType}:{email: string; token: string; emailType:"VERIFY" | "RESET"}) => {
    let subject= ""
    let html= ""
    if (emailType==="VERIFY"){
        const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`
        subject= `Verify Your Email`
        html= `
        <h2>Welcome to BuySphere!</h2>
        <p>Please click the link below to verify your email</p>
        <a href="${verificationLink}">Verify Email</a>`
    }
    if (emailType==="RESET"){
        const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`
        subject= `Reset Your Password`
        html= `
        <h2>Reset Your Password</h2>
        <p>Click the link below to reset your password.</p>
        <a href="${resetLink}">Reset Password</a>
        <p>The link will expire in 15 minutes.</p>`
    }
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html,
    })
}