import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
        .setTitle('API FOR TINAMYS_APP')
        .setDescription('API for tinamys APP')
        .setVersion('1.0.0')
        .build()
  
  const document = SwaggerModule.createDocument(app,config);

  SwaggerModule.setup('swagger' , app , document);

  const port = parseInt(process.env.APP_PORT)  ?? 3000;

  await app.listen(port  , () => {
    console.log("Server run in port: " + port);
  });

}
bootstrap();
