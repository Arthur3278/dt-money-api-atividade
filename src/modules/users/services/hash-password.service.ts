import { Injectable } from "@nestjs/common";
import { randomBytes, scryptSync } from "crypto";

@Injectable()
export class HashPasswordService {
  execute(plainPassword: string): string {
    const salt = randomBytes(16).toString("hex");
    const hash = scryptSync(plainPassword, salt, 64);
    return `${salt}:${hash.toString("hex")}`;
  }
}
