import { Test, TestingModule } from "@nestjs/testing";
import { CreateUserDTO } from "../dto/create-user.dto";
import { IUserRepository } from "../infra/repositories/user.repository.abstract";
import { CreateUserService } from "./create-user.service";
import { HashPasswordService } from "./hash-password.service";

describe("CreateUserService", () => {
  let service: CreateUserService;

  const userMockRepository = {
    create: jest.fn(),
  };

  const hashPasswordMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
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

    service = module.get<CreateUserService>(CreateUserService);
    jest.clearAllMocks();
  });

  it("should hash password and create user returning public fields", async () => {
    const dto: CreateUserDTO = {
      name: "Maria",
      email: "maria@email.com",
      password: "secret12",
    };

    hashPasswordMock.execute.mockReturnValue("salt:hashhex");
    const persisted = {
      id: "uuid-1",
      name: dto.name,
      email: dto.email,
      password: "salt:hashhex",
    };
    userMockRepository.create.mockResolvedValue(persisted);

    const result = await service.execute(dto);

    expect(hashPasswordMock.execute).toHaveBeenCalledWith("secret12");
    expect(userMockRepository.create).toHaveBeenCalledWith({
      name: dto.name,
      email: dto.email,
      password: "salt:hashhex",
    });
    expect(result).toEqual({
      id: "uuid-1",
      name: "Maria",
      email: "maria@email.com",
    });
  });
});
