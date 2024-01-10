import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CodeEntity } from "./code.entity";
import { CodeControllerAdmin } from "./code.controller.admin";
import { CodeService } from "./code.service";
import { UserEntity } from "../user/user.entity";
import { UserModule } from "../user/user.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([CodeEntity , UserEntity]),
        UserModule
    ],
    controllers:[CodeControllerAdmin],
    providers:[CodeService],
    exports:[CodeService]
})
export class CodeModule{
    
}