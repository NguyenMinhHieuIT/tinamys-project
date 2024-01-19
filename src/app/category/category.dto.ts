import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateCategoryDto{
    @ApiProperty()
    @IsNotEmpty({message:'Tên không để trống!'})
    name:string;

    @ApiProperty()
    @IsOptional()
    description:string;

    @ApiProperty()
    @IsOptional()
    type:string;

    @ApiProperty()
    @IsOptional()
    parent_id:number;

    @ApiProperty()
    @IsOptional()
    image:string;
}