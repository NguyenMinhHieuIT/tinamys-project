import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { appConstant } from './constant/app.constant';
import { ErrorException } from './exception/error.exception';
import { AllExceptionFilter } from './exception/all.exception';
import configuration from './config/index';
import { CONSTANT } from './constant/constant';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const optionCors = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  };
  app.enableCors(optionCors);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      //off erro notification
      disableErrorMessages: true,
      //notification with important attribute
      skipMissingProperties: false,
      // return error
      exceptionFactory: (errors) => new ErrorException(Object.values(errors[0].constraints)[0]),
      //* white list = true Eliminate fields that dto does not have
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionFilter());
  const config = new DocumentBuilder()
        .setTitle('API FOR TINAMYS_APP')
        .addBearerAuth()
        .setDescription('API for tinamys APP')
        .setVersion('1.0.0')
        .build()
  
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('swagger' , app , document);
  const port = CONSTANT.APP.PORT;
  await app.listen(port  , () => {
    console.log("Server run in port: " + port);
  });

}
bootstrap();
