import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CommonService } from "src/common/common.service";
import { CategoryEntity } from "./category.entity";
import { DataSource, Repository } from "typeorm";
import { CreateCategoryDto } from "./category.dto";

@Injectable()
export class CategoryService extends CommonService<CategoryEntity>{
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepo : Repository<CategoryEntity>,
        private readonly dataSource:DataSource,
    ){
        super(categoryRepo)
    }

    public aliasName = 'categories';



    public async _checkDataExist(currentUser, data , id) {
        return {
            success:false
        }
    }

    public async getTreeById(user , id){
        const treeExist = await this.categoryRepo.findOne({where:{id:id}});
        const tree = await this.dataSource.getTreeRepository(CategoryEntity).findDescendantsTree(treeExist);
        return {
            success:true,
            data: tree
        }
    }

    public async getCountDescendants(user , id){
        const treeExist = await this.categoryRepo.findOne({where:{id:id}});
        const countDescendants : number = await this.dataSource.getTreeRepository(CategoryEntity).countDescendants(treeExist);
        return {
            success:true,
            countDescendants
        }
    }

    public async getTree(user){
        // const treeExist = await this.categoryRepo.findOne({where:{id:5}});
        const tree = await this.dataSource.getTreeRepository(CategoryEntity).findTrees();
        return {
            success:true,
            data: tree
        };
    }

    public async create(user , data : CreateCategoryDto){
        const {parent_id} = data;
        const categoryParent = await this.categoryRepo.findOne({where:{id:parent_id}});
        const categoryChil = await this.categoryRepo.create(data);
        categoryChil.parent = categoryParent;

        const res = await this.categoryRepo.save(categoryChil);
        
        return {
            success:true,
            create_id:res.id
        }
    }
}