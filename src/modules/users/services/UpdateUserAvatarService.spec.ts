import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

import UserRepositoryFake from '../repositories/fakes/UserRepositoryFake';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to create a new user', async () => {
    const userRepositoryFake = new UserRepositoryFake();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      userRepositoryFake,
      fakeStorageProvider,
    );

    const user = await userRepositoryFake.create({
      name: 'Carlos Alexandre',
      email: 'carlos@gmail.com',
      password: '1234',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avartarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    const userRepositoryFake = new UserRepositoryFake();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      userRepositoryFake,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        avartarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const userRepositoryFake = new UserRepositoryFake();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(
      userRepositoryFake,
      fakeStorageProvider,
    );

    const user = await userRepositoryFake.create({
      name: 'Carlos Alexandre',
      email: 'carlos@gmail.com',
      password: '1234',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avartarFilename: 'avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avartarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
