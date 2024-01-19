import { Injectable } from "@nestjs/common";
import { AuthForgotPasswordDto, ForgotPasswordDto, LoginDto, RefreshTokenDto, RegisterDto } from "./auth.dto";
import { UserService } from "src/app/user/user.service";
import { typeLogin } from "src/constant/type.login.constant";
import { CodeService } from "src/app/code/code.service";
import { typeCode } from "src/constant/type.code";
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcrypt';
import { statusConstant } from "src/constant/status.constant";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { DeviceService } from "src/app/device/device.service";
import { CONSTANT } from "src/constant/constant";
import { jwtConstant } from "src/constant/jwt.constant";
import { ErrorException } from "src/exception/error.exception";

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
        const token = await this.jwtSer.sign({email:data.email , otp:code['code']});
        const url = `http://localhost:${CONSTANT.APP.PORT}/api/auth/auth-register?token=${token}`;
        this.eventEmitter.emit('sendEmail', {
            to: data.email,
            subject: code['code'] + process.env.REGISTER_SUBJECT,
            text:'successfully !',
            html: `Or click here: <a href=${url}>${url}</a>`,
        })
        //return
        return {
            success: true,
            user_id: user['id']
        }
    }

    public async authOtp(data:any) {
        // compare Otp and return code & user_id
        let {otp , email} = data;
        if(data['token']){
            const payload = await this.jwtSer.verify(data['token'])
            email = payload['email'];
            otp = payload['otp'];
        }
        const code = await this.codeSer.compareOtp(otp, email , typeCode.register);
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
        const jwtOptional:JwtSignOptions = {
            secret:jwtConstant.secret,
            expiresIn:'2400000'
        }
        
        const refreshToken = await this.jwtSer.signAsync(userValidate , jwtOptional);
        const refreshTokenHash = await bcrypt.hash( refreshToken , 5 );
        
        const {device} = data;
        device['user_id'] = userValidate.id;
        await this.deviceSer.createByFields(device);
        await this.userSer.updateByFields({id:userValidate['id']} , {refresh_token:refreshTokenHash});
        return {
            success: true,
            user_id: userValidate.id,
            name: userValidate.name,
            email: userValidate.email,
            accessToken,
            refreshToken
        }

    }

    public async fogotPassword(data : ForgotPasswordDto){
        const userExist = await this.userSer._checkDataExist(null , data , null); 
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

        const userExist = await this.userSer._checkDataExist(null , data , null); 
        if(!userExist['success']) return userExist;

        const newPasswordHash = await bcrypt.hash(data.newPassword, 5);
        const code = await this.codeSer.compareOtp(data.otp, data.email , typeCode.forgot_password);
        
        await this.userSer.updateByFields(
            {id:code['user_id']},
            {password:newPasswordHash}
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

    public async refreshToken(body:RefreshTokenDto){
        const {refreshToken} = body;
        const data = await this.jwtSer.verifyAsync(refreshToken);
        const checkUser = await this.userSer._checkFieldExist('email' , data['email'] , null);
        if(!checkUser) return checkUser;
        const user = await this.userSer.findOneByFields({id:data['id']} ,['refresh_token']);
        const checkToken = await bcrypt.compare(refreshToken  , user['refresh_token']);
        if(!checkToken) throw new ErrorException('Refresh token không đúng !');
        const {iat , exp , ... payload} = data;
        const accessToken = await this.jwtSer.signAsync(payload);

        const jwtOptional:JwtSignOptions = {
            secret:jwtConstant.secret,
            expiresIn:'2400000'
        }
        
        const refreshTokenNew = await this.jwtSer.signAsync(payload , jwtOptional);
        const refreshTokenHash = await bcrypt.hash( refreshTokenNew , parseInt(process.env.HASH_SALT));
        await this.userSer.updateByFields({id:data['id']} , {refresh_token:refreshTokenHash});

        return {
            success: true,
            user_id: data.id,
            name: data.name,
            email: data.email,
            accessToken,
            refreshTokenNew
        }

    }
}