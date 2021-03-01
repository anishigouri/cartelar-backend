import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/user';
import CreateUsersService from '../services/CreateUsersService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const userRepository = getCustomRepository(UserRepository);
  const users = userRepository.find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUsersService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.get('/:id', async (request, response) => {
  const id = request.params;
  const userRepository = getCustomRepository(UserRepository);
  const users = userRepository.findOne({ where: id });

  return response.json(users);
});

export default usersRouter;
