import User from '@entities/User';

export default interface IUserRepository {
  findByUsername(username: string): Promise<User | undefined>;

  findById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  findAll(): Promise<User[] | undefined>;

  save({ name, email, password }: User): Promise<User>;
}
