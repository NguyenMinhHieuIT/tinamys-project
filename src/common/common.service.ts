import { Injectable } from "@nestjs/common";
import { ErrorException } from "src/exception/error.exception";
import { FindManyOptions, FindOneOptions, Like, Not, Repository } from "typeorm";
import { CommonEntity } from "./common.entity";
import { skip } from "rxjs";

@Injectable()
export class CommonService<T extends CommonEntity>{
    protected aliasName:string = '';
    constructor(protected readonly repository:Repository<T>){}

    public async createByFields(data:any){
        try {
            const entity = await this.repository.create(data);
            return await this.repository.save(entity);
        } catch (error) {
            throw new ErrorException('common createByFields error -- ' + error);
        }
    }


    public async create(user , data:any){
        try {
            const dataEntity =  await this._beforeUpdateData(user , data);
            const dataExist = await this._checkDataExist(user , dataEntity);
            if(dataExist['success']) throw new ErrorException('Đối tượng đã tồn tại !');
            dataEntity['created_by_id'] = user['id'];
            const dataCreate = await this.repository.create(dataEntity);
            const dataSave =  await this.repository.save(dataCreate);
            return {
                success:true,
                create_id:this.aliasName + ' id: ' + dataSave['id'],
            }
        } catch (error) {
            throw new ErrorException('common create error -- ' + error);
        }
    }


    public async update(user , data:any , id:number){
        try {
            const dataEntity = await this._beforeUpdateData(user , data);

            const dataExist = await this._checkDataExist(user , dataEntity);
            if(!dataExist['success']) return dataExist;

            const options: FindOneOptions = {
                where: { id },
            };
            const dataDb = await this.repository.findOne(options);
            if(!dataDb) throw new ErrorException('id nhập không đúng !');
            await this.repository.merge(dataDb , dataEntity);
            dataDb['updated_by_id'] = user['id'];
            dataDb['updated_at'] = new Date();
            const dataSave =  await this.repository.save(dataDb);
            return {
                success:true,
                update_id:this.aliasName + ' id: ' + dataSave['id'],
            }
        } catch (error) {
            throw new ErrorException('common update error -- ' + error);
        }
    }

    public async updateByFields(where , fields){
        try {
            await this.repository.update(where , fields);
        } catch (error) {
            throw new ErrorException('common updateByFields error -- ' + error);
        }
    }

    public async findAll(user , query){
       try {
            const limit = parseInt(query['limit']) || 10;
            const page = parseInt(query['page']) || 0;
            

            let skip = limit * (page - 1);
            skip = skip > 0 ? skip : 0;

            const options : FindManyOptions = {
                order: {created_at : 'ASC'},
                take : limit,
                skip: skip,
            }
            const [result , total] = await this.repository.findAndCount(options);

            return {
                success : true,
                result,
                total,
                current_page: page,
                next_page: page + 1,          
            }
       } catch (error) {
            throw new ErrorException('common find all error -- ' + error);  
       }
        

    }

    public async findOne(user , data){

    }

    public async delete(user , id){
        try {
            const options : FindOneOptions = {
                where: {id}
            };
            
            const dataDb = await this.repository.findOne(
                options
            );
            if(!dataDb) {
                throw new ErrorException('User đã bị xóa hoặc không tồn tại !'); 
            }
            
            dataDb['deleted_at'] = new Date();
            dataDb['deleted_by_id'] = user['id'];
            
            const userSave = await this.repository.save(dataDb);
            return {
                success:true,
                delete_id:userSave['id'],
            }
        } catch (error) {
            throw new ErrorException('common delete error -- ' + error);
        }
    }

    public async _checkFieldExist(field , value , id){
        try {
            const where = {};

            where[field] = value;

            if(id){
                where['id'] = Not(id);
            }

            const count = await this.repository.count({
                where:where
            })

            return count > 0;
        } catch (error) {
            throw new ErrorException('checkFieldExist error -- ' + error);
        }  
    }

    public async _checkDataExist(currentUser, data) {
        console.log('check exist of common!')
        return {
            success:true
        }
    }

    protected async _beforeUpdateData(currentUser , data){
       return data
    }

}