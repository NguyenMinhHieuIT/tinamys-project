import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadService } from "../services/upload.service";
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { FileUploadDto } from "../dtos/upload.dto";
import { JwtAuthGuard } from "src/auth/guard/jwt.auth.guard";



@ApiTags('Upload Admin')
@Controller('admin/upload')
export class UploadControllerAdmin{
    constructor(private readonly uploadSer:UploadService){

    }

}



@ApiTags('Upload App')
@Controller('app/upload')
export class UploadControllerApp{
    constructor(private readonly uploadSer:UploadService){

    }


    @Post('upload-avata')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: FileUploadDto})
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
              const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
              return callback(null, `${randomName}${extname(file.originalname)}`);
            },
          }),
        }),
      )
    uploadAvata(@UploadedFile() file , @Req() req){
        return this.uploadSer.uploadAvatarUser(req.user, file);
    }
}

