import * as moment from 'moment';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { RegisterRequests } from './register.requests.entity';
import { RegisterRequestInterface } from '../../../support/interfaces';

/**
 * RegisterRequestsService
 * Register requests service.
 *

 */
export class RegisterRequestsService {
  /**
   * Constructor of class.
   * @params Repository<RegisterRequests> registerRequestsRepository
   */
  constructor(
    @InjectRepository(RegisterRequests)
    private registerRequestsRepository: Repository<RegisterRequests>,
  ) {}

  /**
   * Method for create new register requests
   * @params RegisterRequestInterface params
   * @return Promise<RegisterRequests>
   */
  public async createRegisterRequest(
    params: RegisterRequestInterface,
  ): Promise<RegisterRequests> {
    return await this.registerRequestsRepository.save(
      Object.assign(new RegisterRequests(), params, {
        is_active: true,
        actived_at: moment().add(1, 'days'),
      }),
    );
  }

  /**
   * Method to get register request by uuid.
   * @params String uuid
   * @params ObjectLiteral where
   * @return Promise<RegisterRequests>
   */
  public async getRegisterRequestByUuid(
    uuid: string,
    where: ObjectLiteral = {},
  ): Promise<RegisterRequests | null> {
    const record = await this.registerRequestsRepository.find({
      where: {
        uuid,
        ...where,
      },
    });

    return record[0] || null;
  }

  /**
   * Method to close old requester requests.
   * @params ObjectLiteral where
   * @return Promise<void>
   */
  public async closeOldRegisterRequests(
    where: ObjectLiteral = {},
  ): Promise<void> {
    await this.registerRequestsRepository.update(
      {
        is_active: true,
        ...where,
      },
      {
        is_active: false,
        updated_at: moment().format('Y-MM-D H:mm:s'),
      },
    );
  }
}
