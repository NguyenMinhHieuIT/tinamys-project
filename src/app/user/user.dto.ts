import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsIn, IsOptional, Matches, MinLength } from "class-validator";
import { CONSTANT } from "src/constant/constant";
import { statusConstant } from "src/constant/status.constant";

export class GetProfileDto {
    @ApiProperty()
    name:string;
    @ApiProperty()
    email:string;
    @ApiProperty()
    gender:string;
    @ApiProperty()
    birth:string;
    @ApiProperty()
    phone:string;
    @ApiProperty()
    address:string;
    @ApiProperty()
    image:string;
}


export class CreateUserDto {
    @ApiProperty({example:'NguyenMinhHieu'})
    @MinLength(4 , {message:'username chứa ít nhất 4 kí tự!'})
    name:string;

    @ApiProperty({example:'hieu@gmail.com'})
    @IsEmail({} , {message:'Định dạng email không hợp lệ!'})
    email:string;

    @ApiProperty({example:'string123'})
    @Matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
     {message:'password tối thiểu có 8 kí tự bao gồm kí tự và số!'})
    password:string;

    @ApiProperty({example:'male'})
    @IsOptional()
    @IsIn([CONSTANT.GENDER.MALE , CONSTANT.GENDER.FEMALE], 
        {message:'Gender is ' + CONSTANT.GENDER.MALE + ' or ' + CONSTANT.GENDER.FEMALE })
    gender:string;

    @ApiProperty()
    @IsOptional()
    birth:string;

    @ApiProperty()
    @IsOptional()
    phone:string;

    @ApiProperty()
    @IsOptional()
    address:string;

    @ApiProperty()
    @IsOptional()
    image:string;

    @ApiProperty({example:statusConstant.active})
    @IsOptional()
    @IsIn([statusConstant.active ,statusConstant.in_active ], 
        {message:'status active : ' + statusConstant.active + ' in_active: '+statusConstant.in_active})
    status:number;


}

export class UpdateUserDto extends PartialType(CreateUserDto){

}