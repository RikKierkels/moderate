import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { Logger } from '@nestjs/common';
import { SeedService } from './seed.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const logger = appContext.get(Logger);
  const seeder = appContext.get(SeedService);

  try {
    await seeder.seed();
  } catch {
    logger.log('Seeding failed!');
  }

  logger.log('Seeding completed!');
  await appContext.close();
}

bootstrap();
