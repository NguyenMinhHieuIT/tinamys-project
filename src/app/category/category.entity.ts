import { CommonEntity } from "src/common/common.entity";
import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity('categories')
@Tree("closure-table")
export class CategoryEntity extends CommonEntity{
    @PrimaryGeneratedColumn({name:'id'})
    id:number;
    @Column({name:'name'})
    name:string;
    @Column({name:'description'})
    description:string;
    @Column({name:'type'})
    type:string;
    @Column({name:'image'})
    image:string;

    @TreeParent({onDelete:'CASCADE'})
    parent: CategoryEntity;

    @TreeChildren()
    children: CategoryEntity[];
}