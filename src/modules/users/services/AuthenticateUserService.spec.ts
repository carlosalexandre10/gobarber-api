import AppError from '@shared/errors/AppError';

import HashProviderFake from '../providers/HashProvider/fakes/HashProviderFake';
import UserRepositoryFake from '../repositories/fakes/UserRepositoryFake';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const userRepositoryFake = new UserRepositoryFake();
    const hashProviderFake = new HashProviderFake();

    const createUserService = new CreateUserService(
      userRepositoryFake,
      hashProviderFake,
    );
    const authenticateUserService = new AuthenticateUserService(
      userRepositoryFake,
      hashProviderFake,
    );

    const user = await createUserService.execute({
      name: 'Carlos Alexandre',
      email: 'carlos@gmail.com',
      password: '123',
    });

    const response = await authenticateUserService.execute({
      email: 'carlos@gmail.com',
      password: '123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    const userRepositoryFake = new UserRepositoryFake();
    const hashProviderFake = new HashProviderFake();

    const authenticateUserService = new AuthenticateUserService(
      userRepositoryFake,
      hashProviderFake,
    );

    await expect(
      authenticateUserService.execute({
        email: 'carlos@gmail.com',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate with wrong password', async () => {
    const userRepositoryFake = new UserRepositoryFake();
    const hashProviderFake = new HashProviderFake();

    const createUserService = new CreateUserService(
      userRepositoryFake,
      hashProviderFake,
    );
    const authenticateUserService = new AuthenticateUserService(
      userRepositoryFake,
      hashProviderFake,
    );

    await createUserService.execute({
      name: 'Carlos Alexandre',
      email: 'carlos@gmail.com',
      password: '123',
    });

    await expect(
      authenticateUserService.execute({
        email: 'carlos@gmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
