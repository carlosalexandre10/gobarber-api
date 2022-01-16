import { getRepository, Repository } from 'typeorm';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepostiry: Repository<UserToken>;

  constructor() {
    this.ormRepostiry = getRepository(UserToken);
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepostiry.create({
      user_id,
    });

    await this.ormRepostiry.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepostiry.findOne({ where: { token } });

    return userToken;
  }
}

export default UserTokensRepository;
