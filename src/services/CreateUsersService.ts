import { hash } from 'bcryptjs';
import User from '@entities/User';
import AppError from '@errors/AppError';
import IUserRepository from '@repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExist = await this.userRepository.findByEmail(email);

    if (checkUserExist) {
      throw new AppError('Já existe um usuário com esse e-mail.');
    }

    const hashedPass = await hash(password, 8);

    const newUser = new User(name, email, hashedPass);

    const user = await this.userRepository.save(newUser);

    return user;
  }
}
