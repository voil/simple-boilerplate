import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../core/entities/base.service'; 
import { PrivilageCategorie } from './privilages.categories.entity';

/**
 * PrivilagesCategoriesService
 * Privilages categories service.
 *

 */
export class PrivilagesCategoriesService implements BaseService {
  /**
   * Constructor of class.
   * @params Repository<PrivilageCategorie> privilageCategorieRepository
   */
  constructor(
    @InjectRepository(PrivilageCategorie)
    private privilageCategorieRepository: Repository<PrivilageCategorie>,
  ) {}

  /**
   * Method to get privilage categories list.
   * @return Promise<Array<PrivilageCategorie>>
   */
  public async getList(): Promise<Array<PrivilageCategorie>> {
    return await this.privilageCategorieRepository.find({
      where: {
        is_active: true,
      },
      relations: ['types'],
    });
  }
}
