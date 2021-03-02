import { inject, injectable } from 'tsyringe';
import UserRepository from '@repositories/UserRepository';
import AppError from '@errors/AppError';
import UserTokensRepository from '@repositories/UserTokensRepository';

interface IRequest {
  email: string;
}
@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private usersRepository: UserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Usuário não cadastrado.');
    }

    await this.userTokensRepository.generate(user.id);
    // await this.mailProvider.sendMail(email, 'Recuperação de senha');
  }
}
