import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/app/user/user.entity";
import { UserModule } from "src/app/user/user.module";
import { UploadControllerAdmin, UploadControllerApp } from "../controllers/upload.controller";
import { UploadService } from "../services/upload.service";

@Module({
    imports:[TypeOrmModule.forFeature([]) , UserModule],
    controllers:[UploadControllerAdmin , UploadControllerApp],
    providers:[UploadService],
    exports:[UploadService]
})
export class UploadModule{}