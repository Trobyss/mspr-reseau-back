import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "msprgaulois@gmail.com",
    pass: "Lesgauloissontlesplusfort34"
  }
});

export const sendEmail = async (options: Mail.Options): Promise<any> => {
  return await transporter.sendMail(options);
};
