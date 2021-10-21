import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

class UserRepository implements IUsersRepository {
  private ormRepostiry: Repository<User>;

  constructor() {
    this.ormRepostiry = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepostiry.findOne(id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepostiry.findOne({
      where: { email },
    });

    return findUser;
  }
  public async save(user: User): Promise<User> {
    return this.ormRepostiry.save(user);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepostiry.create({ name, email, password });

    await this.ormRepostiry.save(user);

    return user;
  }
}

export default UserRepository;
