import { EntityRepository, Repository } from 'typeorm';
import User from '../models/User';

class UserRepository extends Repository<User> {
  public async findByUsername(username: string): Promise<User | null> {
    const findUser = await this.findOne({ where: username });

    return findUser || null;
  }
}

export default UserRepository;
