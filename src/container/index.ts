import IUserRepository from '@repositories/IUserRepository';
import UserRepository from '@repositories/UserRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
