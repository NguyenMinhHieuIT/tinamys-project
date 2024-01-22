import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength , Matches, IsNotEmpty, Length } from "class-validator";
import { CreateDeviceDto } from "src/app/device/device.dto";

export class RegisterDto{
    @ApiProperty({})
    @MinLength(4 , {message:'username chứa ít nhất 4 kí tự!'})
    name:string;

    @ApiProperty()
    @IsEmail({} , {message:'Định dạng email không hợp lệ!'})
    email:string;

    @ApiProperty()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/ , {message:'password tối thiểu có 8 kí tự bao gồm kí tự và số!'})
    password:string;
}

export class LoginDto {
    @ApiProperty({example:'hieukd01yc@gmail.com'})
    @IsEmail({} , {message:'Định dạng email không hợp lệ!'})
    email:string;

    @ApiProperty({example:'string123'})
    @Matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/ , {message:'password tối thiểu có 8 kí tự bao gồm kí tự và số!'})
    password:string;

    @ApiProperty()
    @IsNotEmpty({message:'Device không để trống!'})
    device:CreateDeviceDto;

}

export class AuthOtpDto {
    @ApiProperty()
    @IsEmail({} , {message:'Định dạng email không hợp lệ!'})
    email:string;

    @ApiProperty()
    @IsNotEmpty({message:'Otp không để trống !'})
    @Length(4,4,{message:'Otp phải chứa 4 kí tự !'})
    otp:string;
}


export class ForgotPasswordDto {
    @ApiProperty()
    @IsEmail({} , {message:'Định dạng email không hợp lệ!'})
    email:string;
}


export class AuthForgotPasswordDto {
    @ApiProperty()
    @IsEmail({} , {message:'Định dạng email không hợp lệ!'})
    email:string;

    @ApiProperty()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/ , {message:'password tối thiểu có 8 kí tự bao gồm kí tự và số!'})
    newPassword:string;

    @ApiProperty()
    @IsNotEmpty({message:'Otp không để trống !'})
    @Length(4,4,{message:'Otp phải chứa 4 kí tự !'})
    otp:string;
}


export class RefreshTokenDto {
    @ApiProperty()
    @IsNotEmpty({message:'refesh token không để trống !'})
    refreshToken:string;
}


