import nodemailer from 'nodemailer';

const password = process.env.NEXT_PUBLIC_GOOGLE_APP_PW;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: 'youngeunkim373@gmail.com',
    pass: password,
  },
});

export interface SendEmailProps {
  to: string[];
  subject: string;
  text?: string;
  html?: string;
}

export const sendEmail = async ({ to, subject, text, html }: SendEmailProps) => {
  const info = await transporter.sendMail({
    from: '"Passersby" <youngeunkim373@gmail.com>',
    to: to.join(', '),
    subject,
    text, // plain text body
    html, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};