import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import UserRepositoryFake from '../repositories/fakes/UserRepositoryFake';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let userRepositoryFake: UserRepositoryFake;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    userRepositoryFake = new UserRepositoryFake();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      userRepositoryFake,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recorver the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await userRepositoryFake.create({
      name: 'Carlos Alexandre',
      email: 'carlos@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'carlos@gmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recorver a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'carlos@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to recorver the password using the email', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await userRepositoryFake.create({
      name: 'Carlos Alexandre',
      email: 'carlos@gmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'carlos@gmail.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
