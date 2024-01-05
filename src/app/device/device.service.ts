import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeviceEntity } from "./device.entity";
import { Repository } from "typeorm";
import { ErrorException } from "src/exception/error.exception";
import { CommonService } from "src/common/common.service";

@Injectable()
export class DeviceService extends CommonService<DeviceEntity>{
    constructor(
        @InjectRepository(DeviceEntity) private readonly deviceRepo:Repository<DeviceEntity>,
    ){
        super(deviceRepo)
    }

    public aliasName:string = 'devices'; 

    public async createDevice(data : any){
        try {
            const deviceEntity = await this.deviceRepo.create(data)
            return await this.deviceRepo.save(deviceEntity);
        } catch (error) {
            throw new ErrorException('createDevice error  -- ' + error);
        }
    } 
}