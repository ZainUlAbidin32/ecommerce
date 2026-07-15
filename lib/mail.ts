import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({
  email,
  token,
  otp,
  emailType,
}: {
  email: string;
  token?: string;
  otp?: string;
  emailType: "VERIFY" | "RESET";
}) => {
  let subject = "";
  let html = "";
  if (emailType === "VERIFY") {
    subject = "Verify Your Email";
    html = `
    <h2>Welcome to BuySphere!</h2>
    <p>Your verification OTP is:</p>
    <h1>${otp}</h1>
    <p>This OTP will expire in 10 minutes.</p>
`;
  }
  if (emailType === "RESET") {
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token!}`;
    subject = `Reset Your Password`;
    html = `
        <h2>Reset Your Password</h2>
        <p>Click the link below to reset your password.</p>
        <a href="${resetLink}">Reset Password</a>
        <p>The link will expire in 15 minutes.</p>`;
  }
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html,
  });
};
