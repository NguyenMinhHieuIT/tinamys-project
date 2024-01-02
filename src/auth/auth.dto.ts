import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, MinLength , Matches } from "class-validator";

export class RegisterDto{
    
    @ApiProperty({})
    @MinLength(4)
    username:string;

    @ApiProperty()
    @IsEmail({} , {message:'Not email'})
    email:string;

    @ApiProperty()
    @Matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)
    password:string;
}