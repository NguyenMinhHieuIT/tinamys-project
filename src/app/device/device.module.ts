import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceEntity } from "./device.entity";
import { DeviceControllerAdmin } from "./device.controller";
import { DeviceService } from "./device.service";

@Module({
    imports:[TypeOrmModule.forFeature([DeviceEntity])],
    controllers:[DeviceControllerAdmin],
    providers:[DeviceService],
    exports:[DeviceService],
})
export class DeviceModule{

}