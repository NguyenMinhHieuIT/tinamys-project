import {CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class EntityCommon{
    @DeleteDateColumn({name:'deleted_at' , type : 'timestamp'})
    deleted_at:Date;
    @CreateDateColumn({name:'created_at' , type:'timestamp'})
    created_at:Date;
    @UpdateDateColumn({name:'updated_at' , type:'timestamp'})
    updated_at:Date;
}