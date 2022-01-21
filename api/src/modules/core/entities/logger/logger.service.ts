import { Repository } from 'typeorm';
import { Logger } from './logger.entity';
import { LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * LogService
 * Log service to catch all errors.
 *
 * @subpackage LoggerService

 */
export class LogService implements LoggerService {
  /**
   * Constructor of class.
   * @params Repository<Logger> loggerRepository
   */
  constructor(
    @InjectRepository(Logger)
    private loggerRepository: Repository<Logger>,
  ) {}

  /**
   * Method to catch log.
   * @param string message
   */
  log(message: string) {
    //
  }

  /**
   * Method to catch error.
   * @param string message
   * @param string trace
   */
  error(message: string, trace: string) {
    //
  }

  /**
   * Method to catch warn.
   * @param string message
   */
  warn(message: string) {
    //
  }

  /**
   * Method to catch debug.
   * @param string message
   */
  debug(message: string) {
    //
  }

  /**
   * Method to catch verbose.
   * @param string message
   */
  verbose(message: string) {
    //
  }
}
