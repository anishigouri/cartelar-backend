import User from '../models/User';

class UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public create(user: User): User | null {
    return this.users.find(u => user.username === u.username) || null;
  }
}
