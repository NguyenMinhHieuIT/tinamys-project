import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min} from "class-validator";

export class FindAllDto{
    @ApiProperty()
    @Min(1,{message:'Limit không bé hơn 1 !'})
    @IsInt({message:'Limit là số nguyên !'})
    limit:number;

    @ApiProperty()
    @IsInt({message:'Page là số nguyên !'})
    @Min(1,{message:'page không bé hơn 1 !'})
    page:number;
}