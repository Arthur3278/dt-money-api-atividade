import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/shared/prisma.service";
import {
  CreateUserRepositoryData,
  IUserRepository,
  UpdateUserRepositoryData,
} from "../user.repository.abstract";

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserRepositoryData) {
    try {
      return await this.prisma.user.create({ data });
    } catch (e: unknown) {
      if (
        typeof e === "object" &&
        e !== null &&
        "code" in e &&
        (e as { code: string }).code === "P2002"
      ) {
        throw new ConflictException("E-mail já cadastrado");
      }
      throw e;
    }
  }

  async update(id: string, data: UpdateUserRepositoryData) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      });
    } catch (e: unknown) {
      if (
        typeof e === "object" &&
        e !== null &&
        "code" in e &&
        (e as { code: string }).code === "P2002"
      ) {
        throw new ConflictException("E-mail já cadastrado");
      }
      throw e;
    }
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async delete(id: string) {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
