import nodemailer from "nodemailer";

const password = process.env.MAIL_PASSWORD as string;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "moksedur.rahman.sohan@gmail.com",
    pass: password,
  },
});

export async function sendMail(sendTo: string, mail: any) {
  
  try {
    const mailOptions = {
      from: "moksedur.rahman.sohan@gmail.com",
      to: sendTo,
      subject: mail.subject || "Cart-o",
      text: mail.text,
      html: mail.html,
    };
    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (err: any) {
    console.log(err);
    return err.message;
  }
}
