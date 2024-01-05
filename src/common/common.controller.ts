// import { ApiResponse } from "@nestjs/swagger";
// import { CommonService } from "./common.service";
// import { Body, Post } from "@nestjs/common";

// export class CommonController<T , D> {
//     constructor(
//         protected readonly service:CommonService<T>,
//     ){

//     }

    
//    protected createDto ;

//     @ApiResponse({status:200 , type: createDto})
//     @Post()
//     createCode(@Body() body){
//         return this.service.create(body);
//     }
    
// }