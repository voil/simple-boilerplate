import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from './services/config.service';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

/**
 * MailModule
 * Mail module to initizalize mail smtp.
 *

 */
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule.register()],
      useFactory: async (configService: ConfigService) => {
        return {
          transport: {
            host: 'xpoczta.hb.pl',
            port: 587,
            ignoreTLS: true,
            secure: false,
            auth: {
              user: configService.get('MAIL_USER'),
              pass: configService.get('MAIL_PASSWORD'),
            },
          },
          defaults: {
            from: `"${configService.get(
              'MAIL_FROM_NAME',
            )}" <${configService.get('MAIL_FROM')}>`,
          },
          template: {
            dir: __dirname + '/../../../src/support/templates',
            adapter: new EjsAdapter(),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class MailModule {}
