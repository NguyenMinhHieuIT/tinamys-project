import { Injectable } from "@nestjs/common";
import { AuthForgotPasswordDto, AuthOtpDto, ForgotPasswordDto, LoginDto, RegisterDto } from "./auth.dto";
import { UserService } from "src/app/user/user.service";
import { ErrorException } from "src/exception/error.exception";
import { typeLogin } from "src/constant/type.login.constant";
import { CodeService } from "src/app/code/code.service";
import { typeCode } from "src/constant/type.code";
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcrypt';
import { statusConstant } from "src/constant/status.constant";
import { JwtService } from "@nestjs/jwt";
import { DeviceService } from "src/app/device/device.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userSer: UserService,
        private readonly codeSer: CodeService,
        private readonly eventEmitter: EventEmitter2,
        private readonly jwtSer: JwtService,
        private readonly deviceSer: DeviceService,

    ) { }


    public async register(data: RegisterDto) {
        data.password = await bcrypt.hash(data.password, 5);
        data['type_login'] = typeLogin.local;
        //create user
        const user = await this.userSer.createRegister(data);
        //create code 
        const code = await this.codeSer.createByFields({
            code: this.codeSer.createOtp(),
            user_id: user['id'],
            type: typeCode.register
        });
        //create event emit sendEmail (to,subject,text)
        this.eventEmitter.emit('sendEmail', {
            to: data.email,
            subject: code['code'] + process.env.REGISTER_SUBJECT,
            text: process.env.REGISTER_TEXT,
            html:`<h2>Or click <a href="http://localhost:3000/api/auth/auth-register?otp=${code['code']}&email=${data.email}">here</a> to verify .</h2>`
        })
        //return
        return {
            success: true,
            user_id: user['id']
        }
    }

    public async authOtp(data: AuthOtpDto) {
        // compare Otp and return code & user_id
        const code = await this.codeSer.compareOtp(data.otp, data.email , typeCode.register);
        //update status user => active

        await this.userSer.updateByFields(
            { id: code.user_id }, // where
            { status: statusConstant.active } // fields update
        )
        //update status code => active
        await this.codeSer.updateByFields(
            { id: code.id }, // where
            { status: statusConstant.active } // fields update
        )

        return {
            success: true,
            message: 'successfully!'
        }
    }

    public async login(data: LoginDto) {
        const userValidate = await this.userSer.validateUser(data);
        const accessToken = await this.jwtSer.signAsync(userValidate);
        const {device} = data;
        device['user_id'] = userValidate.id;
        await this.deviceSer.createByFields(device);
        return {
            success: true,
            user_id: userValidate.id,
            name: userValidate.name,
            email: userValidate.email,
            accessToken,
        }
    }

    public async fogotPassword(data : ForgotPasswordDto){
        const userExist = await this.userSer._checkDataExist(null , data); 
        if(!userExist['success']) return userExist;
        
        const user = await this.userSer.findOneByFields({email:data.email} , ['id']);
        const code = await this.codeSer.createByFields({
            code: this.codeSer.createOtp(),
            user_id: user['id'],
            type: typeCode.forgot_password
        });

        this.eventEmitter.emit('sendEmail', {
            to: data.email,
            subject: code['code'] + process.env.FORGOT_PASSWORD_SUBJECT,
            text: process.env.REGISTER_TEXT,
        })

        return {
            success:true,
            message:'Send email successfully !'
        }
    }

    public async authForgotPassword(data:AuthForgotPasswordDto){

        const userExist = await this.userSer._checkDataExist(null , data); 
        if(!userExist['success']) return userExist;

        data.newPassword = await bcrypt.hash(data.newPassword, 5);
        const code = await this.codeSer.compareOtp(data.otp, data.email , typeCode.forgot_password);
        
        await this.userSer.updateByFields(
            {id:code['user_id']},
            {password:data.newPassword}
        )

        await this.codeSer.updateByFields(
            { id: code.id}, // where
            { status: statusConstant.active } // fields update
        )
        
        return {
            success:true,
            messgae:'successfully !'
        }

    }
}