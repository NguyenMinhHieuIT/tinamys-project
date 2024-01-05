import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorException extends HttpException{
    constructor(message : string, statusCode:number = HttpStatus.BAD_REQUEST , success:boolean = false )
    {
        super({success, message} , statusCode);
    }
}