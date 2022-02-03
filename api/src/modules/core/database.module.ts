import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './services/config.service';

/**
 * DatabaseModule
 * Database module to initizalize database.
 *

 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.register()],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          logging: false,
          cache: true,
          host: configService.get('DATABASE_HOST'),
          port: parseInt(configService.get('DATABASE_PORT'), 10),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_DATABASE'),
          schema: configService.get('DATABASE_SCHEMA'),
          entities: [`${__dirname}/../../**/**/**/*.entity{.ts}`],
          autoLoadEntities: true,
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
