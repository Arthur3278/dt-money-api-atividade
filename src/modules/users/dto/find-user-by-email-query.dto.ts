import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class FindUserByEmailQueryDto {
  @ApiProperty({ description: "E-mail do usuário", example: "maria@email.com" })
  @IsEmail()
  email: string;
}
