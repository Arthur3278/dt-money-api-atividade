import { Test, TestingModule } from "@nestjs/testing";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { FindUserByEmailService } from "./find-user-by-email.service";

describe("FindUserByEmailService", () => {
  let service: FindUserByEmailService;

  const userMockRepository = {
    findByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByEmailService,
        {
          provide: IUserRepository,
          useValue: userMockRepository,
        },
      ],
    }).compile();

    service = module.get<FindUserByEmailService>(FindUserByEmailService);
    jest.clearAllMocks();
  });

  it("should return user without password", async () => {
    const full = {
      id: "id-1",
      name: "Maria",
      email: "m@e.com",
      password: "hash",
    };
    userMockRepository.findByEmail.mockResolvedValue(full);

    const result = await service.execute("m@e.com");

    expect(userMockRepository.findByEmail).toHaveBeenCalledWith("m@e.com");
    expect(result).toEqual({
      id: "id-1",
      name: "Maria",
      email: "m@e.com",
    });
  });
});
