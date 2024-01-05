import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty } from "class-validator";

export class CreateDeviceDto {
    @ApiProperty()
    @IsNotEmpty({message:'Device_id không để trống!'})
    device_id:string;

    @ApiProperty()
    @IsNotEmpty({message:'Name không để trống!'})
    name:string;

    @ApiProperty()
    @IsNotEmpty({message:'os không để trống!'})
    os:string;

    @ApiProperty()
    @IsNotEmpty({message:'version không để trống!'})
    version:string;
}