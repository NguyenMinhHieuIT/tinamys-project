import { Injectable } from "@nestjs/common";
import { ErrorException } from "src/exception/error.exception";
import * as nodemailer from 'nodemailer';

@Injectable()
export class AdminService{
    constructor(
    ){}

    public aliasName : string = 'admins';

    public async sendEmail(to :string, subject:string, text:string) {
      try {
          const tranporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

            await tranporter.sendMail({
              from: process.env.EMAIL_USER,
              to,
              subject,
              text,
            });

            return {
              success: true,
              message: 'Email send successfully!',
            };
      } catch (error) {
        throw new ErrorException('send Email error -- ' + error);
      }
        
    }
}