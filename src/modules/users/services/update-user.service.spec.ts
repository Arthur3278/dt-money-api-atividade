import { Test, TestingModule } from "@nestjs/testing";
import { UpdateUserDTO } from "../dto/update-user.dto";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { HashPasswordService } from "./hash-password.service";
import { UpdateUserService } from "./update-user.service";

describe("UpdateUserService", () => {
  let service: UpdateUserService;

  const userMockRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  const hashPasswordMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: IUserRepository,
          useValue: userMockRepository,
        },
        {
          provide: HashPasswordService,
          useValue: hashPasswordMock,
        },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
    jest.clearAllMocks();
  });

  const existing = {
    id: "id-1",
    name: "Old",
    email: "old@email.com",
    password: "oldhash",
  };

  it("should hash password when updating password", async () => {
    userMockRepository.findById.mockResolvedValue(existing);
    hashPasswordMock.execute.mockReturnValue("newhash");
    userMockRepository.update.mockResolvedValue({
      ...existing,
      password: "newhash",
    });

    const data: UpdateUserDTO = { password: "newsecret12" };
    const result = await service.execute("id-1", data);

    expect(hashPasswordMock.execute).toHaveBeenCalledWith("newsecret12");
    expect(userMockRepository.update).toHaveBeenCalledWith("id-1", {
      password: "newhash",
    });
    expect(result).toEqual({
      id: "id-1",
      name: "Old",
      email: "old@email.com",
    });
  });

  it("should not call update when payload is empty", async () => {
    userMockRepository.findById.mockResolvedValue(existing);

    const result = await service.execute("id-1", {});

    expect(userMockRepository.update).not.toHaveBeenCalled();
    expect(result).toEqual({
      id: "id-1",
      name: "Old",
      email: "old@email.com",
    });
  });
});
