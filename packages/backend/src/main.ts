import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ZodExceptionFilter } from './utils/ZodExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.enableCors({
    origin: ['http://localhost:5173'],
    credentials: true,
  });

  app.useGlobalFilters(new ZodExceptionFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
