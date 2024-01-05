import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity('devices')
export class DeviceEntity extends CommonEntity{
    @PrimaryGeneratedColumn({name:'id' , type:'int'})
    id:number;
    @Column({name:'device_id' , type:'varchar'})
    device_id:string;
    @Column({name:'name' , type:'varchar'})
    name:string;
    @Column({name:'os' , type:'varchar'})
    os:string;
    @Column({name:'version' , type:'varchar'})
    version:string; 

    @Column({name:'user_id' , type:'int'})
    user_id:number; 

    @ManyToOne(() => UserEntity , (user) => user.devices)
    @JoinColumn({name:'user_id'})
    user: UserEntity;
}