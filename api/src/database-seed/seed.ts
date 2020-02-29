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
    logger.log('Seeding completed!');
  } catch (err) {
    logger.log('Seeding failed!', err);
  } finally {
    await appContext.close();
  }
}

bootstrap();
