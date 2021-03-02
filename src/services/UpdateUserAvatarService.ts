import path from 'path';
import fs from 'fs';
import User from '@entities/User';
import AppError from '@errors/AppError';
import IUserRepository from '@repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import uploadConfig from '../config/upload';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        'Necessário estar autenticado para trocar a foto',
        403,
      );
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.director, user.avatar);
      const userAvatarFileExists = fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await this.userRepository.save(user);

    return user;
  }
}
