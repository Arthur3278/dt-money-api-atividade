import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import type { Response } from "express";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDTO } from "../dto/create-user.dto";
import { CreateUserService } from "../services/create-user.service";

@ApiTags("users")
@Controller("users")
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post("")
  @ApiOperation({ summary: "Cadastrar um novo usuário" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Usuário criado com sucesso.",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Dados de entrada inválidos.",
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "E-mail já cadastrado.",
  })
  @ApiBody({ type: CreateUserDTO, description: "Dados do usuário" })
  async handle(@Body() data: CreateUserDTO, @Res() res: Response) {
    const user = await this.createUserService.execute(data);
    return res.status(HttpStatus.CREATED).json(user);
  }
}
