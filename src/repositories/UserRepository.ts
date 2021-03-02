import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '@entities/User';
import IUserRepository from './IUserRepository';

@EntityRepository(User)
class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ where: username });

    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({ where: id });

    return findUser;
  }

  public async findAll(): Promise<User[] | undefined> {
    const findUser = await this.ormRepository.find();

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email },
    });

    return findUser;
  }

  public async save({ name, email, password }: User): Promise<User> {
    const newUser = await this.ormRepository.save({ name, email, password });
    return newUser;
  }
}

export default UserRepository;
