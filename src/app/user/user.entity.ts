import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CodeEntity} from "../code/code.entity";
import { statusConstant } from "src/constant/status.constant";
import { DeviceEntity } from "../device/device.entity";

@Entity('users')
export class UserEntity extends CommonEntity{
    @PrimaryGeneratedColumn({name:'id' , type:'int'})
    id:number;

    @Column({name:'name' , type:'varchar'})
    name:string;

    @Column({name:'email' , type:'varchar'})
    email:string;

    @Column({name:'password' , type:'varchar' , select:false})
    password:string;

    @Column({name:'image' , type:'varchar' , default:null})
    image:string;

    @Column({name:'gender' , type:'varchar' , default:null})
    gender:string;

    @Column({name:'birth' , type:'varchar', default:null})
    birth:string;

    @Column({name:'phone' , type:'varchar', default:null})
    phone:string;
    @Column({name:'address' , type:'varchar', default:null})
    address:string;

    @Column({name:'refresh_token' , type:'varchar', default:null})
    refresh_token:string;

    @Column({name:'is_online' , type:'varchar', default:null})
    is_online:string;

    @Column({name:'type_login' , type:'varchar', default:null})
    type_login:string;

    @Column({name:'role' , type:'varchar', default:null})
    role:string;

    @Column({name:'status' , type:'int' , default:statusConstant.in_active})
    status:number;
    
    @OneToMany(() => CodeEntity , (codes) => codes.user)
    codes: CodeEntity[];

    @OneToMany(() => DeviceEntity , (devices) => devices.user)
    devices: DeviceEntity[];

}