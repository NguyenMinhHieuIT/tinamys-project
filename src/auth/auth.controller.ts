import { Body, Controller, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { RegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@ApiTags('Auth')
@Controller('auth')
export class AuthController{
    constructor(private readonly authService:AuthService){}

    
    @ApiResponse({status:200 , description:'Register'})
    @Post('register')
    register(@Body() body:RegisterDto){
        return this.authService.register(body);
    }
}