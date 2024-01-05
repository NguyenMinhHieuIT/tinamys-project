import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CodeEntity } from "./code.entity";
import { CodeController } from "./code.controller.admin";
import { CodeService } from "./code.service";
import { UserEntity } from "../user/user.entity";

@Module({
    imports:[TypeOrmModule.forFeature([CodeEntity , UserEntity])],
    controllers:[CodeController],
    providers:[CodeService],
    exports:[CodeService]
})
export class CodeModule{
    
}