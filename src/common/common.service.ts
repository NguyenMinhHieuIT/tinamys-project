import { Injectable } from "@nestjs/common";
import { ErrorException } from "src/exception/error.exception";
import { Repository } from "typeorm";

@Injectable()
export class CommonService<T>{
    protected aliasName:string = '';
    constructor(protected readonly repo:Repository<T>){}

    public async createByFields(data:any){
        try {
            const entity = await this.repo.create(data);
            return await this.repo.save(entity);
        } catch (error) {
            throw new ErrorException('createCode error -- ' + error);
        }
    }


    public async create(data:any){
        try {
            const entity = await this.repo.create(data);
            return await this.repo.save(entity);
        } catch (error) {
            throw new ErrorException('createCode error -- ' + error);
        }
    }


    public async update(data:any){
        try {
        } catch (error) {
            throw new ErrorException('updateCode error -- ' + error);
        }
    }

    public async updateByFields(where , fields){
        try {
            await this.repo.update(where , fields);
        } catch (error) {
            throw new ErrorException('updateCode error -- ' + error);
        }
    }

    
}