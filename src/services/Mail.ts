import { BaseService } from "./Base";
import nodemailer from "nodemailer";
import { ServiceContainer } from "@services/";
import Mail from "nodemailer/lib/mailer";

// TODO
export class MailService extends BaseService {
  transporter: Mail;

  constructor(app: ServiceContainer) {
    super(app);

    this.transporter = nodemailer.createTransport({
      auth: {
        pass: this.config.mail.password,
        user: this.config.mail.user,
      },
      host: this.config.mail.host,
      port: this.config.mail.port,
      secure: true,
    });
  }

  /**
   *
   * @param {string} subject
   * @param {string} text
   * @param {string} html
   * @param {string} to
   * @returns {object}
   */
  mailOptions(subject: string, text: string, html: string, to: string) {
    return {
      from: `Password <${this.config.mail.user}>`,
      html,
      subject,
      text,
      to,
    };
  }

  /**
   *
   * @param {object} mailOption
   * @returns {Promise<void>}
   */
  async sendEmail(mailOption: Mail.Options) {
    try {
      // if (process.env.NODE_ENV === "production") {
      //   await this.transporter.sendMail(mailOption);
      // } else {
      console.log(mailOption);
      // }
    } catch (error) {
      console.log(mailOption);
    }
  }
}
