import { Test, TestingModule } from "@nestjs/testing";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { FindUserByIdService } from "./find-user-by-id.service";

describe("FindUserByIdService", () => {
  let service: FindUserByIdService;

  const userMockRepository = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserByIdService,
        {
          provide: IUserRepository,
          useValue: userMockRepository,
        },
      ],
    }).compile();

    service = module.get<FindUserByIdService>(FindUserByIdService);
    jest.clearAllMocks();
  });

  it("should return user without password", async () => {
    const full = {
      id: "id-1",
      name: "Maria",
      email: "m@e.com",
      password: "hash",
    };
    userMockRepository.findById.mockResolvedValue(full);

    const result = await service.execute("id-1");

    expect(userMockRepository.findById).toHaveBeenCalledWith("id-1");
    expect(result).toEqual({
      id: "id-1",
      name: "Maria",
      email: "m@e.com",
    });
  });
});
