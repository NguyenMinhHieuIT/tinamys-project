import { Controller } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { OnEvent } from "@nestjs/event-emitter";

@Controller('admin')
export class AdminController{
    constructor(
        private readonly adminSer:AdminService,
    ){}

    @OnEvent('sendEmail')
    public handleEvent(data) {
        try {
            this.adminSer.sendEmail(data['to'], data['subject'], data['text']);
        } catch (error) {
            return error
        }
  }
}