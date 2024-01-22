import { Controller } from "@nestjs/common";
import { EmailService } from "./email.service";
import { OnEvent } from "@nestjs/event-emitter";

@Controller('email')
export class EmailController{
    constructor(
        private readonly adminSer:EmailService,
    ){}

    @OnEvent('sendEmail')
    public handleEvent(data) {
        try {
            this.adminSer.sendEmail(data['to'], data['subject'], data['text'] , data['html']);
        } catch (error) {
            return error
        }
  }
}