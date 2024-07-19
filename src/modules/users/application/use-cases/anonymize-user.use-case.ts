import { Injectable, Inject } from '@nestjs/common';
import { IUsersRepository } from '../../domain/interfaces/users.repository.interface';
import { UserDeletedException } from '../../../../common/errors/exceptions/user-deleted.exception';
import { UsersRepositoryToken } from '../../domain/tokens/inject-tokens';

// Definindo interfaces específicas para este use case
export interface IAnonymizeUserUseCase {
  execute(userId: string): Promise<void>;
}

@Injectable()
export class AnonymizeUserUseCase implements IAnonymizeUserUseCase {
  constructor(
    @Inject(UsersRepositoryToken)
    private readonly usersRepository: IUsersRepository,
  ) {}

  public async execute(userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (user.isDeleted) {
      throw new UserDeletedException();
    }

    const anonymizedData = {
      email: `deleted_user_${userId}@deleted.com`,
      isDeleted: true,
    };

    await this.usersRepository.update(userId, anonymizedData);
  }
}
