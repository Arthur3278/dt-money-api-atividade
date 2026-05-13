import { Test, TestingModule } from "@nestjs/testing";
import { HashPasswordService } from "./hash-password.service";

describe("HashPasswordService", () => {
  let service: HashPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashPasswordService],
    }).compile();

    service = module.get<HashPasswordService>(HashPasswordService);
  });

  it("should return a non-reversible string different from plain password", () => {
    const plain = "myPassword123";
    const hashed = service.execute(plain);

    expect(hashed).not.toBe(plain);
    expect(hashed).toContain(":");
    expect(hashed.length).toBeGreaterThan(plain.length);
  });

  it("should produce different output for same password (salt)", () => {
    const plain = "samePassword12";
    const a = service.execute(plain);
    const b = service.execute(plain);

    expect(a).not.toBe(b);
  });
});
