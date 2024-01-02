import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo:Repository<UserEntity> 
    ){}
    public aliasName:string = 'users';

    async create(data){
        return this.userRepo.save(data);
    }
}