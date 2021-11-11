import HashProviderFake from '@modules/users/providers/HashProvider/fakes/HashProviderFake';
import AppError from '@shared/errors/AppError';

import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import UserRepositoryFake from '../repositories/fakes/UserRepositoryFake';
import ResetPasswordService from './ResetPasswordService';

let userRepositoryFake: UserRepositoryFake;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let hashProviderFake: HashProviderFake;

describe('ResetPassword', () => {
  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    hashProviderFake = new HashProviderFake();

    resetPasswordService = new ResetPasswordService(
      userRepositoryFake,
      fakeUserTokensRepository,
      hashProviderFake,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await userRepositoryFake.create({
      name: 'Carlos Alexandre',
      email: 'carlos@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(hashProviderFake, 'generateHash');

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    const updatedUser = await userRepositoryFake.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await userRepositoryFake.create({
      name: 'Carlos Alexandre',
      email: 'carlos@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
