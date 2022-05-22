import { getManager } from 'typeorm';
import { ApiError } from '../exceptions';
import { User } from './entities';
import { CreateUserDto } from './types';

export class Service {
  static async create(dto: CreateUserDto) {
    let user = await User.createQueryBuilder('user')
      .where('login = :login OR github_id = :githubId OR email = :email', {
        login: dto.login,
        githubId: dto.githubId,
        email: dto.email,
      })
      .getOne();

    if (user) {
      throw ApiError.BadRequest(
        `User with provided credentials already exists`
      );
    }

    // @ts-ignore
    user = {
      ...dto,
    };
    // @ts-ignore
    await User.save(user);

    return user;
  }

  static async check(login: string) {
    const user = await User.findOne({
      where: {
        login,
      },
    });

    if (!user) {
      throw new ApiError(404, `User with login ${login} does not exist`);
    }
    return user;
  }
}
