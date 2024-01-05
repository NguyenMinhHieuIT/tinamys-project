import { IsIn } from "@nestjs/class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Length} from "class-validator";
import { typeCode } from "src/constant/type.code";

export class CreateCodeDto{
    @ApiProperty()
    @IsNotEmpty({message:'Code không được để trống !'})
    @Length(4,4 ,{message:'Code phải có 4 kí tự !' })
    code:string;

    @ApiProperty()
    @IsNotEmpty({message:'Type không để trống !'})
    @IsIn([typeCode.register, typeCode.forgot_password], 
        {message:'type chỉ nhận ' + typeCode.register + ' -- ' + typeCode.forgot_password})
    type:string;

    @ApiProperty()
    @IsNotEmpty({message:'User_id không để trống !'})
    user_id:number;
}


export class UpdateCodeDto extends PartialType(CreateCodeDto){}
