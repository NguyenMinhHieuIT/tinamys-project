import { ApiProperty } from "@nestjs/swagger";

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