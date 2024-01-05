import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CodeEntity } from "./code.entity";
import { ErrorException } from "src/exception/error.exception";
import { CommonService } from "src/common/common.service";
import { UserEntity } from "../user/user.entity";
import { typeCode } from "src/constant/type.code";
import { statusConstant } from "src/constant/status.constant";

@Injectable()
export class CodeService extends CommonService<CodeEntity> {
    constructor(
        @InjectRepository(CodeEntity) 
        private readonly codeRepo:Repository<CodeEntity>,
        @InjectRepository(UserEntity) 
        private readonly userRepo:Repository<UserEntity>,
    ){
        super(codeRepo);
    }

    public aliasName:string = 'codes';

    public createOtp() {
        try {
            return Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, '0');
        } catch (error) {
            throw new ErrorException('createOtp error -- ' + error);
        }
    }
    
    public async compareOtp(otp , email , typeOtp : string){
        try {
            const codeQuery = await this.codeRepo.createQueryBuilder(this.aliasName);
            const code = await codeQuery.innerJoinAndSelect(this.aliasName + '.user' , 'user')                  
                        .select([this.aliasName + '.code'])
                        .addSelect([this.aliasName + '.user_id'])
                        .addSelect([this.aliasName + '.status'])
                        .addSelect([this.aliasName + '.id'])
                        .where( 'user.email = :email' , {email:email})
                        .andWhere(this.aliasName + '.type = :type' , {type:typeOtp})
                        .orderBy(this.aliasName + '.created_at', 'DESC') 
                        .getOne()
          
            if(!code  || otp != code['code'] || code.status == statusConstant.active) throw new ErrorException('Otp không chính xác hoặc không hợp lệ !');
    
            return code;
        } catch (error) {
            throw new ErrorException('compareOtp error -- ' + error)
        }
    }


    public async updateByFileds(where , fields){
        try {
            await this.repo.update(where , fields);
        } catch (error) {
            throw new ErrorException('updateCode error -- ' + error);
        }
    }

    
}