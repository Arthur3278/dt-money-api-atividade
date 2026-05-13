import { Module } from "@nestjs/common";
import { PrismaUserRepository } from "src/modules/users/infra/repositories/prisma/prisma.user.repository";
import { IUserRepository } from "src/modules/users/infra/repositories/user.repository.abstract";
import { PrismaService } from "src/shared/prisma.service";
import { usersControllers } from "./controllers";
import { userServices } from "./services";

@Module({
  controllers: [...usersControllers],
  providers: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    ...userServices,
  ],
})
export class UsersModule {}
