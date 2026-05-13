import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
  @ApiProperty({ description: "Nome do usuário", example: "Maria Silva" })
  @IsString()
  name: string;

  @ApiProperty({ description: "E-mail", example: "maria@email.com" })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Senha (será armazenada com hash seguro)",
    example: "senhaSegura123",
    minLength: 6,
  })
  @IsString()
  @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres" })
  password: string;
}
