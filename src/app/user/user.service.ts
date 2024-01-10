import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { DeepPartial, Repository } from "typeorm";
import { ErrorException } from "src/exception/error.exception";
import { CommonService } from "src/common/common.service";
import * as bcrypt from 'bcrypt';
import { statusConstant } from "src/constant/status.constant";
import { CONSTANT } from "src/constant/constant";
@Injectable()
export class UserService extends CommonService<UserEntity>{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo:Repository<UserEntity> 
    ){
        super(userRepo)
    }
    public aliasName:string = 'users';

    public async createRegister(data:any){
        try {
            const userExist = await this._checkDataExist(null , data); 
            if(userExist['success']) throw new ErrorException('user đã tồn tại!');
            const userEntity = await this.userRepo.create(data);
            return await this.userRepo.save(userEntity);
        } catch (error) {
            throw new ErrorException('Create user error -- ' + error);
        }
    }


   public async validateUser(data){
        try {
            const userExist = await this._checkDataExist(null , data); 
            if(!userExist['success']) throw new ErrorException(userExist['message']);
            const user = await this.userRepo.findOne({
                where:{
                    email:data.email
                },
                select:['password' , 'email' , 'name' , 'status', 'id']
            })
            if(user.status == statusConstant.in_active) throw new ErrorException('Người dùng chưa hoạt động <in_active> !');
            const {password , status , ... userData} = user;
            const checkPass = await bcrypt.compare(data.password , password);
            if(!checkPass) throw new ErrorException('Mật khẩu không chính xác !');
            return userData;
        } catch (error) {
            throw new ErrorException("validateUser error -- " + error);
        }       
   }

   public async getProfile(user){
        try {
            const userData = await this.userRepo.findOne({
                where:{
                    id:user.id
                },
                select:['name', 'email', 'gender' , 'birth' , 'phone' , 'image' , 'address']
            })

            return {
                success: true,
                data: userData
            }
        } catch (error) {
            throw new ErrorException("getProfile error -- " + error);
        }
   }

   public async findOneByFields(where , fields){
        try {
            const user  = await this.userRepo.findOne({
                where:where,
                select:fields
            })
                
            return user;
        } catch (error) {
            throw new ErrorException('findOneByFields -- ' + error);
        }
    }

    public async _checkDataExist(currentUser, data: DeepPartial<UserEntity>){
        try {
            if(data['email']){
                const emailExist = await this._checkFieldExist('email' , data['email'] , null);
                if(!emailExist){
                    return {
                        success:false,
                        message:'User chưa tồn tại!',
                    }
                }
            }

            return {
                success:true
            }
        } catch (error) {
            throw new ErrorException('checkDataExist error -- ' + error);
            
        }
        
    }


    public async _beforeUpdateData(currentUser: any, data: DeepPartial<UserEntity>){
        try {
            if(data['password']){
                data['password'] = await bcrypt.hash(data['password'] , 5);

            }
            

            data['status'] = data['status'] ?? CONSTANT.STATUS.ACTIVE;            
            return data
        } catch (error) {
            throw new ErrorException('beforeUpdateData error -- ' + error);
        }
        
    }
}