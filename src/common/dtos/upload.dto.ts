import { ApiProperty } from "@nestjs/swagger";

export class FileUploadDto {
    @ApiProperty({
      description: 'File to be uploaded',
      type: 'string',
      format: 'binary',
    })
    file: any;
  }