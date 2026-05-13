import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { toPublicUser } from "../utils/to-public-user";

@Injectable()
export class FindUserByIdService {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);
    return toPublicUser(user);
  }
}
