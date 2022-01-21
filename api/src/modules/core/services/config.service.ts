import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';

/**
 * ConfigService
 * Config service to handle initialize config params.
 *

 */
@Injectable()
export class ConfigService {
  /**
   * @var any
   */
  private readonly envConfig: any;

  /**
   * @var string
   */
  private envPath: string = '../../../../%path%.env';

  /**
   * Constructor of class.
   */
  constructor() {
    const envoirment =
      process.env.NODE_ENV ||
      fs.readFileSync(path.join(__dirname, this.parsePath('')));
    this.envConfig = dotenv.parse(
      fs.readFileSync(path.join(__dirname, this.parsePath(`.${envoirment}`))),
    );
  }

  /**
   * Method to get key from config file.
   * @param String key
   * @return String
   */
  public get(key: string): string {
    return this.envConfig[key];
  }

  /**
   * Method to parse config path.
   * @param String arg
   * @return String
   */
  private parsePath(arg: string): string {
    return this.envPath.replace('%path%', arg);
  }
}
