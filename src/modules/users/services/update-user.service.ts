import { Injectable } from "@nestjs/common";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { HashPasswordService } from "./hash-password.service";
import { toPublicUser } from "../utils/to-public-user";
import type { UpdateUserRepositoryData } from "../infra/repositories/user.repository.abstract";

@Injectable()
export class UpdateUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  async execute(id: string, data: UpdateUserDTO) {
    const existing = await this.userRepository.findById(id);

    const payload: UpdateUserRepositoryData = {};
    if (data.name !== undefined) {
      payload.name = data.name;
    }
    if (data.email !== undefined) {
      payload.email = data.email;
    }
    if (data.password !== undefined) {
      payload.password = this.hashPasswordService.execute(data.password);
    }

    if (Object.keys(payload).length === 0) {
      return toPublicUser(existing);
    }

    const updated = await this.userRepository.update(id, payload);
    return toPublicUser(updated);
  }
}
