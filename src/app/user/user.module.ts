import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserControllerAdmin, UserControllerApp } from "./user.controller.admin";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";


@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    controllers:[UserControllerAdmin , UserControllerApp],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule{}