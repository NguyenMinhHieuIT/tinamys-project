import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags  } from "@nestjs/swagger";
import { CodeService } from "./code.service";
import { CreateCodeDto, UpdateCodeDto } from "./code.dto";
import { JwtAuthGuard } from "src/auth/guard/jwt.auth.guard";


@ApiTags('Code Admin')
@Controller('admin/code')
export class CodeControllerAdmin{
    constructor(
        private readonly codeSer:CodeService,
    ){
       
    }
    
    @ApiResponse({status:201})
    @ApiOperation({summary:'Admin tạo đối tượng code !'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    createCode(@Request() req ,@Body() body:CreateCodeDto){
        return this.codeSer.create(req.user , body);
    }

    @ApiResponse({status:200})
    @ApiOperation({summary:'Admin sửa đối tượng code !'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    updateCode(@Request() req , @Body() body:UpdateCodeDto , @Param() param){
        return this.codeSer.update(req.user, body , param.id);
    }


    @ApiResponse({status:200})
    @ApiOperation({summary:'Admin tìm một đối tượng code !'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    findOneCode(@Request() req ,@Param() param){
        return this.codeSer.findOne(req.user,  param.id);
    }


    @ApiResponse({status:200})
    @ApiQuery({name:'limit' , required: false, type: Number , description:'Giới hạn !'})
    @ApiQuery({name:'page' , required: false, type: Number , description:'Trang số !'})
    @ApiOperation({summary:'Admin tìm tất cả đối tượng code !'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    findAllCode(@Request() req , @Query() query){
        console.log(query);
        return this.codeSer.findAll(req.user, query);
    }
    

    @ApiResponse({status:200})
    @ApiOperation({summary:'Admin xóa đối tượng code !'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    deleteCode(@Request() req , @Param() param){
        return this.codeSer.delete(req.user, param.id);
    }
}