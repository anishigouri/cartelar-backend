import UserRepository from '@repositories/UserRepository';
import CreateUsersService from '@services/CreateUsersService';
import UpdateUserAvatarService from '@services/UpdateUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersController {
  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userRepository = new UserRepository();
    const users = userRepository.findAll();

    return response.json(users);
  }

  public async save(request: Request, response: Response): Promise<Response> {
    const userRepository = new UserRepository();
    const { name, email, password } = request.body;

    const createUser = new CreateUsersService(userRepository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const userRepository = new UserRepository();
    const { id } = request.params;
    const users = userRepository.findById(id);

    return response.json(users);
  }

  public async updateAvatar(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
