import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guard/jwt.auth.guard";
import { GetProfileDto } from "./user.dto";

@ApiTags('User App')
@Controller('app/user')
export class UserControllerApp{
    constructor(
        private readonly userSer:UserService,
    ){}

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({status:200 , type:GetProfileDto})
    @ApiBearerAuth()
    @ApiOperation({summary:'Lấy dữ liệu profile người dùng !'})
    public profile(@Request() req){
        return this.userSer.getProfile(req.user);
    }
}