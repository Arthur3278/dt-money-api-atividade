import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { toPublicUser } from "../utils/to-public-user";

@Injectable()
export class FindUserByEmailService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return toPublicUser(user);
  }
}
