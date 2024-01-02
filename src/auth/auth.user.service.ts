import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/app/user/user.entity";
import { Repository } from "typeorm";
import * as crypto from 'crypto';

@Injectable()
export class AuthUserService{
    constructor(@InjectRepository(UserEntity) private readonly userRepo:Repository<UserEntity>){}
    public aliasName:string = 'users';
    public async validateUser(email){
        try {
            const userQuery = await this.userRepo.createQueryBuilder(this.aliasName);
            const userCount:number = await userQuery
            .select([this.aliasName + '.email'])
            .where(this.aliasName + 'email = :email' , {email:email})
            .getCount();

            return userCount > 0;

        } catch (error) {
            return null;
        }
    }

    public md5(password: string): string {
        return crypto.createHash('md5').update(password).digest('hex');
      }
}