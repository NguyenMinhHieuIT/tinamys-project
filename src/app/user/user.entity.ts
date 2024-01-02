import { EntityCommon } from "src/common/entity.common";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity extends EntityCommon{
    @PrimaryGeneratedColumn({name:'id' , type:'int'})
    id:number;
    @Column({name:'name' , type:'varchar'})
    name:string;
    @Column({name:'email' , type:'varchar'})
    email:string;
    @Column({name:'password' , type:'varchar'})
    password:string;
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
}