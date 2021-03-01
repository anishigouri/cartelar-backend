import { hash } from 'bcryptjs';
import { CannotExecuteNotConnectedError, getRepository } from 'typeorm';

import User from '../models/User';
import UserRepository from '../repositories/user';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUsersService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExist = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new Error('Já existe um usuário com esse e-mail.');
    }

    const hashedPass = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPass,
    });

    await usersRepository.save(user);

    return user;
  }
}
