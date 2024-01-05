import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CodeService } from "./code.service";
import { CreateCodeDto, UpdateCodeDto } from "./code.dto";

@ApiTags('Code Admin')
@Controller('admin/code')
export class CodeController{
    constructor(
        private readonly codeSer:CodeService,
    ){
       
    }
    
    @ApiResponse({status:201})
    @ApiOperation({summary:'Admin tạo đối tượng code !'})
    @Post()
    createCode(@Body() body:CreateCodeDto){
        return this.codeSer.create(body);
    }

    @ApiResponse({status:200})
    @ApiOperation({summary:'Admin sửa đối tượng code !'})
    @Post()
    updateCode(@Body() body:UpdateCodeDto){
        return this.codeSer.update(body);
    }
    
}