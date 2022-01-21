import * as moment from 'moment';
import { Projects } from './projects.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import { BaseService } from '../../core/entities/base.service';
import { ProjectTypeInterface } from '../../../support/interfaces';

/**
 * ProjectsService
 * Projects service.
 *

 */
export class ProjectsService implements BaseService {
  /**
   * Constructor of class.
   * @params Repository<Profiles> projectsRepository
   */
  constructor(
    @InjectRepository(Projects)
    private projectsRepository: Repository<Projects>,
  ) {}

  /**
   * Method for get projects list.
   * @params ObjectLiteral where
   * @return Promise<Array<Projects>|null>
   */
  public async getList(
    where: ObjectLiteral = {},
  ): Promise<Array<Projects> | null> {
    return await this.projectsRepository.find({
      where,
      order: {
        id: 'DESC',
      },
      relations: ['team'],
    });
  }

  /**
   * Method to delete project.
   * @params String uuid
   * @return Promise<void>
   */
  public async deleteProject(uuid: string): Promise<void> {
    await this.projectsRepository.update(
      { uuid },
      {
        deleted_at: moment().format('Y-MM-D H:mm:s'),
      },
    );
  }

  /**
   * Method to create project.
   * @params ProjectTypeInterface params
   * @return Promise<Projects>
   */
  public async createProject(params: ProjectTypeInterface): Promise<Projects> {
    const project = Object.assign(new Projects(), params, {
      is_active: true,
    });
    return await this.projectsRepository.save(project);
  }

  /**
   * Method to update project.
   * @params Projects project
   * @params ObjectLiteral params
   * @return Promise<Projects>
   */
  public async updateProject(
    project: Projects,
    params: ObjectLiteral = {},
  ): Promise<Projects> {
    delete params.uuid;
    const updatedAt = moment().format('Y-MM-D H:mm:s');
    this.projectsRepository.update(project.id, {
      ...params,
      updated_at: updatedAt,
    });
    params.updated_at = updatedAt;
    return Object.assign(project, { ...params });
  }
}
