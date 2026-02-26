import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Inyectar variables de entorno manualmente para el desarrollo local
process.env.DATABASE_URL = process.env.DATABASE_URL || 'file:./dev.db';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-prod';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        transform: true,
    }));
    app.enableCors();
    const port = process.env.API_PORT || 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`API is running on port ${port}`);
}
bootstrap();

