import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user/user.entity";

@Entity('codes')
export class CodeEntity extends CommonEntity{
    @PrimaryGeneratedColumn({name:'id' , type:'int'})
    id:number;

    @Column({name:'code' , type:'varchar'})
    code:string;

    @Column({name:'type' , type:'varchar'})
    type:string;
    
    @Column({name:'user_id' , type:'int'})
    user_id:number;

    @Column({name:'status' , type:'int' , default:0})
    status:number;

    @ManyToOne(() => UserEntity , (user) => user.codes)
    @JoinColumn({name:'user_id'})
    user:UserEntity;
}