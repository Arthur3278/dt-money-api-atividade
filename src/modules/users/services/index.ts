import { CreateUserService } from "./create-user.service";
import { DeleteUserService } from "./delete-user.service";
import { FindUserByEmailService } from "./find-user-by-email.service";
import { FindUserByIdService } from "./find-user-by-id.service";
import { HashPasswordService } from "./hash-password.service";
import { UpdateUserService } from "./update-user.service";

export const userServices = [
  HashPasswordService,
  CreateUserService,
  DeleteUserService,
  FindUserByEmailService,
  FindUserByIdService,
  UpdateUserService,
];
