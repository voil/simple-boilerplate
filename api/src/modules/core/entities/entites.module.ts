import { Module } from '@nestjs/common';
import { LoggerModule } from './logger/logger.module';

/**
 * EntityModule
 * Entity module to add models to database.
 *

 */
@Module({
  imports: [LoggerModule],
  exports: [LoggerModule],
})
export class EntityModule {}
