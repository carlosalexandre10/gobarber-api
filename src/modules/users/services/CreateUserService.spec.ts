import AppError from '@shared/errors/AppError';

import HashProviderFake from '../providers/HashProvider/fakes/HashProviderFake';
import UserRepositoryFake from '../repositories/fakes/UserRepositoryFake';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const userRepositoryFake = new UserRepositoryFake();
    const hashProviderFake = new HashProviderFake();

    const createUserService = new CreateUserService(
      userRepositoryFake,
      hashProviderFake,
    );

    const user = await createUserService.execute({
      name: 'Carlos Alexandre',
      email: 'carlos@gmail.com',
      password: '123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const userRepositoryFake = new UserRepositoryFake();
    const hashProviderFake = new HashProviderFake();

    const createUserService = new CreateUserService(
      userRepositoryFake,
      hashProviderFake,
    );

    await createUserService.execute({
      name: 'Carlos Alexandre',
      email: 'carlos@gmail.com',
      password: '123',
    });

    await expect(
      createUserService.execute({
        name: 'Carlos Alexandre',
        email: 'carlos@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
