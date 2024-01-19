import { Controller, Post, UseGuards , Request, Body, Patch, Get, Query, Delete, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guard/jwt.auth.guard";
import { CreateDeviceDto, UpdateDeviceDto } from "./device.dto";
import { DeviceService } from "./device.service";

@ApiTags('Device Admin')
@Controller('admin/device')
export class DeviceControllerAdmin{
    constructor(
        private readonly deviceSer:DeviceService,
    ){}

    @ApiResponse({status:201})
    @ApiOperation({summary:'Admin tạo đối tượng device !'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    createCode(@Request() req ,@Body() body:CreateDeviceDto){
        return this.deviceSer.create(req.user , body);
    }

    @ApiResponse({status:200})
    @ApiOperation({summary:'Admin sửa đối tượng device !'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    updateCode(@Request() req , @Body() body:UpdateDeviceDto , @Param() param){
        return this.deviceSer.update(req.user, body , param.id);
    }


    @ApiResponse({status:200})
    @ApiOperation({summary:'Admin tìm một đối tượng device !'})
    @ApiParam({name:'id' , type:Number , required:true})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    findOneCode(@Request() req ,@Param() param){
        return this.deviceSer.findOne(req.user,  param.id);
    }


    @ApiResponse({status:200})
    @ApiQuery({name:'limit' , required: false, type: Number , description:'Giới hạn !'})
    @ApiQuery({name:'page' , required: false, type: Number , description:'Trang số !'})
    @ApiOperation({summary:'Admin tìm tất cả đối tượng device !'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    findAllCode(@Request() req , @Query() query){
        return this.deviceSer.findAll(req.user, query);
    }
    

    @ApiResponse({status:200})
    @ApiOperation({summary:'Admin xóa mềm device !'})
    @ApiParam({description:'delete' , name:'id' , required:true})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    delete(@Request() req , @Param() param){
        return this.deviceSer.delete(req.user, param.id);
    }
}