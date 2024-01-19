import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags  } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guard/jwt.auth.guard";
import { CreateUserDto, GetProfileDto, UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@ApiTags("User Admin")
@Controller('admin/user')
export class UserControllerAdmin{
    constructor(
        private readonly userSer:UserService
    ){} 

    @ApiResponse({status:201, description : 'gender , address , birth , phone , image is optional'})
    @ApiOperation({summary:'Admin tạo user !'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Request() req,@Body() body:CreateUserDto){
        return this.userSer.create(req.user , body);
    }

    @ApiResponse({status:200})
    @ApiOperation({summary:'Admin sửa user !'})
    @ApiParam({description:'id user update' , name:'id' , required:true, type:Number})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    update(@Request() req , @Body() body:UpdateUserDto , @Param() param){
        return this.userSer.update(req.user, body , param.id);
    }

    @ApiResponse({status:200})
    @ApiOperation({summary:'Admin xóa mềm user !'})
    @ApiParam({description:'id user delete' , name:'id' , required:true, type:Number})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    delete(@Request() req , @Param() param){
        return this.userSer.delete(req.user, param.id);
    }


    @ApiResponse({status:200})
    @ApiOperation({summary:'Admin lấy tất cả user !'})
    @ApiQuery({description:'Trang số' , name:'page' , required:false, type:Number})
    @ApiQuery({description:'Giới hạn' , name:'limit' , required:false , type:Number})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Request() req , @Query() query){
        return this.userSer.findAll(req.user, query);
    }

    @ApiResponse({status:200})
    @ApiOperation({summary:'Admin tìm một user !'})
    @ApiParam({name:'id' , type:Number , required:true})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    getOne(@Request() req ,@Param() param){
        return this.userSer.findOne(req.user,  param.id);
    }

}

@ApiTags("User App")
@Controller('app/user')
export class UserControllerApp{
    constructor(
        private readonly userSer:UserService,
    ){

    } 

    @ApiResponse({status:200 , type:GetProfileDto})
    @ApiOperation({summary:'Lấy hồ sơ người dùng !'})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('/profile')
    profile(@Request() req){
        return this.userSer.getProfile(req.user);
    }

}