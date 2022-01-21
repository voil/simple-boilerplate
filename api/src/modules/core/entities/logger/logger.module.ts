import { Module } from '@nestjs/common';
import { Logger } from './logger.entity';
import { LogService } from './logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';

/**
 * LoggerModule
 * Logger module to catch all errors.
 *

 */
@Module({
  imports: [TypeOrmModule.forFeature([Logger])],
  providers: [LogService],
  exports: [LogService],
})
export class LoggerModule {}
