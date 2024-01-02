import { Injectable } from "@nestjs/common";
import { RegisterDto } from "./auth.dto";
import { AuthUserService } from "./auth.user.service";
import { UserService } from "src/app/user/user.service";

@Injectable()
export class AuthService{
    constructor(
        private readonly authUserSer : AuthUserService,
        private readonly userSer : UserService,
    ){}


    public async register(data:RegisterDto){
        const { username , email , password} = data;
        const userValidate = await this.authUserSer.validateUser(email); 
        if(userValidate){
            return {
                success:false,
                message:'User đã tồn tại!',
            }
        }
        const passwordMd5 = this.authUserSer.md5(password)
        const user = await this.userSer.create({ name:username , email , password:passwordMd5});
        return {
            success:true,
            user_id : user.id
        }
    }
}