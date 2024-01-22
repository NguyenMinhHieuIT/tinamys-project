import { Injectable } from "@nestjs/common";
import { UserService } from "src/app/user/user.service";
import { ErrorException } from "src/exception/error.exception";

@Injectable()
export class UploadService{
    constructor(
        private readonly userSer : UserService
    ){
        
    }


    public async uploadAvatarUser(user , file){
        try {
            const {path} = file;
            const {id} = user;
            await this.userSer.updateByFields({id:id} , {image:path});
            return {
                success:true,
                id:id
            }
        } catch (error) {
            throw new ErrorException('uploadAvataUser err - ' + error);
        }
    }
}