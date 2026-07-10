import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

export const sendVerificationEmail = async (email:string, token:string) => {
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email?token=${token}`
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Verify Your Email`,
        html: `
        <h2>Welcome to BuySphere!</h2>
        <p>Please click the link below to verify your email</p>
        <a href="${verificationLink}">Verify Email</a>
        `
    })
}
