import { Controller, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/app/user/user.entity";
import { AuthUserService } from "./auth.user.service";
import { UserModule } from "src/app/user/user.module";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity]) , UserModule],
    controllers:[AuthController],
    providers:[AuthService , AuthUserService],
    exports:[AuthService]
})
export class AuthModule{}