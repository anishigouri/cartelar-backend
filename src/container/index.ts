import IUserRepository from '@repositories/IUserRepository';
import IUserTokensRepository from '@repositories/IUserTokensRepository';
import UserRepository from '@repositories/UserRepository';
import UserTokensRepository from '@repositories/UserTokensRepository';
import { container } from 'tsyringe';

import EtherealMailProvider from '../providers/MailProvider/EtherealMailProvider';
import IMailProvider from '../providers/models/IMailProvider';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerInstance<IMailProvider>(
  'IMailProvider',
  new EtherealMailProvider(),
);
