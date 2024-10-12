import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindOptionsRelations, Repository } from 'typeorm';

import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getById(id: number, relationOptions?: FindOptionsRelations<User>): Promise<User> {
    const user = await this.findOne({ 
      where: { id },
      relations: relationOptions
    });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
