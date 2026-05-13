import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "../dto/create-user.dto";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { HashPasswordService } from "./hash-password.service";
import { toPublicUser } from "../utils/to-public-user";

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  async execute(data: CreateUserDTO) {
    const hashedPassword = this.hashPasswordService.execute(data.password);
    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    return toPublicUser(user);
  }
}
