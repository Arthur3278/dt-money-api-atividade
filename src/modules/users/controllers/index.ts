import { CreateUserController } from "./create-user.controller";
import { DeleteUserController } from "./delete-user.controller";
import { FindUserByEmailController } from "./find-user-by-email.controller";
import { FindUserByIdController } from "./find-user-by-id.controller";
import { UpdateUserController } from "./update-user.controller";

export const usersControllers = [
  FindUserByEmailController,
  CreateUserController,
  UpdateUserController,
  FindUserByIdController,
  DeleteUserController,
];
