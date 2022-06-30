import nodemailer from "nodemailer";

export async function sendLoginEmail({
  email,
  url,
  token,
}: {
  email: string;
  url: string;
  token: string;
}) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"Jane Doe" <j.doe@example.com>',
    to: email,
    subject: "Login to your account",
    html: `Login by clicking <a href="${url}/login#token=${token}">here</a>`,
  });

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
