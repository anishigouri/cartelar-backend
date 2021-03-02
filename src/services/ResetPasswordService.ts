import { inject, injectable } from 'tsyringe';
import UserRepository from '@repositories/UserRepository';
import AppError from '@errors/AppError';
import UserTokensRepository from '@repositories/UserTokensRepository';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private usersRepository: UserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token não encontrado.');
    }
    const user = await this.usersRepository.findById(userToken.id);

    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    user.password = await hash(password, 8);
    await this.usersRepository.save(user);
  }
}
