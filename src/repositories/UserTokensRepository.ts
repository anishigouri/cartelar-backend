import UserToken from '@entities/UserToken';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import IUserTokensRepository from './IUserTokensRepository';

@EntityRepository(UserToken)
export default class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }
}
