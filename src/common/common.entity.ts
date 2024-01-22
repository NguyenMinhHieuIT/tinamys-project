import {Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class CommonEntity{
    @Column({name:'deleted_at' , type : 'timestamp' , nullable:true})
    deleted_at:Date;
    @CreateDateColumn({name:'created_at' , type:'timestamp'})
    created_at:Date;
    @UpdateDateColumn({name:'updated_at' , type:'timestamp'})
    updated_at:Date;


    @Column({name:'deleted_by_id' , type : 'int' , nullable:true})
    deleted_by_id:number;
    @Column({name:'created_by_id' , type:'int' ,nullable:true})
    created_by_id:number;
    @Column({name:'updated_by_id' , type:'int' , nullable:true})
    updated_by_id:number;
}