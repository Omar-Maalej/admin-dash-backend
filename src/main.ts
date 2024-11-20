import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors: {
      origin: process.env.FRONTEND_URL ,
      exposedHeaders: ['Content-Range'], 
    },
});
  app.useGlobalPipes(new ValidationPipe({
    transform: true, 
    whitelist: true, 
  }
  
  ));


  await app.listen(3000);
}
bootstrap();
