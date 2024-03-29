import { Controller, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/app/user/user.entity";
import { UserModule } from "src/app/user/user.module";
import { CodeModule } from "src/app/code/code.module";
import { JwtModule } from "@nestjs/jwt";

import { JwtStrategy } from "./strategy/jwt.strategy";
import { jwtConstant } from "src/constant/jwt.constant";
import { DeviceModule } from "src/app/device/device.module";
import { EmailModule } from "src/email/email.module";


@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity]), 
        UserModule,
        CodeModule,
        JwtModule.register({
            secret: jwtConstant.secret,
            signOptions: {
              expiresIn: jwtConstant.expiresIn,
            },
        }),
        DeviceModule,
        EmailModule

    ],
    controllers:[AuthController],
    providers:[AuthService , JwtStrategy],
    exports:[AuthService]
})
export class AuthModule{}