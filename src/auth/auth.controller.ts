import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthForgotPasswordDto, AuthOtpDto, ForgotPasswordDto, LoginDto, RegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { query } from "express";

@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService){}

    
    @ApiResponse({status:200})
    @ApiOperation({summary:'Đăng kí người dùng local !'})
    @Post('register')
    register(@Body() body:RegisterDto){
        return this.authService.register(body);
    }


    @ApiResponse({status:200})
    @ApiOperation({summary:'Xác thực mã otp đăng kí tài khoản nhập Otp !'})
    @Post('auth-register')
    authOtp(@Body() body:AuthOtpDto){
        return this.authService.authOtp(body);
    }

    @ApiResponse({status:200})
    @ApiOperation({summary:'Xác thực mã otp đăng kí tài khoản bằng cách nhấn link!'})
    @Get('auth-register')
    authOtpGet(@Query() query:AuthOtpDto){
        return this.authService.authOtp(query);
    }

    @ApiResponse({status:200})
    @ApiOperation({summary:'Đăng nhập tài khoản local !'})
    @Post('login')
    login(@Body() body:LoginDto){
        return this.authService.login(body);
    }

   
    @ApiResponse({status:200})
    @ApiOperation({summary:'Quên mật khẩu !'})
    @Post('forgot-password')
    forgotPassword(@Body() body:ForgotPasswordDto){
        return this.authService.fogotPassword(body);
    }

    @ApiResponse({status:200})
    @ApiOperation({summary:'Xác thực mã otp quên mật khẩu kèm mật khẩu mới !'})
    @Post('auth-forgot-password')
    authForgotPassword(@Body() body:AuthForgotPasswordDto){
        return this.authService.authForgotPassword(body);
    }

    
}