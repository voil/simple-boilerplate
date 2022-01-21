import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';

/**
 * ConfigModule
 * Config module.
 *

 */
@Module({})
export class ConfigModule {
  /**
   * Handle register dynamic module.
   * @return DynamicModule
   */
  static register(): DynamicModule {
    return {
      module: ConfigModule,
      exports: [ConfigService],
      providers: [ConfigService]
    };
  }
}
