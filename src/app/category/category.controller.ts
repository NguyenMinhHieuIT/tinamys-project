import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./category.dto";
import { JwtAuthGuard } from "src/auth/guard/jwt.auth.guard";

@ApiTags('Category Admin')
@Controller('admin/category')
export class CategoryController{
    constructor(private readonly categorySer:CategoryService){}

    @ApiResponse({status:201})
    @ApiOperation({summary:'Admin tạo đối tượng category !'})
    @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req , @Body() body:CreateCategoryDto){
        return this.categorySer.create(req.user , body);
    }


    @ApiResponse({status:200})
    @ApiOperation({summary:'Admin tìm cây theo Id !'})
    @ApiParam({name:'id'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('tree/:id')
    getTreeById(@Req() req , @Param() param){
        return this.categorySer.getTreeById(req.user , param.id);
    }

    @ApiResponse({status:200})
    @ApiOperation({summary:'Admin tìm tất cả cây'})
    @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Get('tree')
    getTree(@Req() req){
        return this.categorySer.getTree(req.user);
    }
}