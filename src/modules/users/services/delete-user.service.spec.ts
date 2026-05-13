import { Test, TestingModule } from "@nestjs/testing";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { DeleteUserService } from "./delete-user.service";

describe("DeleteUserService", () => {
  let service: DeleteUserService;

  const userMockRepository = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        {
          provide: IUserRepository,
          useValue: userMockRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
    jest.clearAllMocks();
  });

  it("should delete when user exists", async () => {
    userMockRepository.findById.mockResolvedValue({
      id: "id-1",
      name: "Maria",
      email: "m@e.com",
      password: "h",
    });
    userMockRepository.delete.mockResolvedValue(undefined);

    await service.execute("id-1");

    expect(userMockRepository.findById).toHaveBeenCalledWith("id-1");
    expect(userMockRepository.delete).toHaveBeenCalledWith("id-1");
  });
});
