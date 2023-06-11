import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './schema/admin.schema';

describe('AdminController', () => {
  let controller: AdminController;
  const adminsArray: Admin[] = [
    {
      username: 'admin1',
      password: 'hashed',
      email: 'admin1@example.com',
    },
    {
      username: 'admin2',
      password: 'hashed',
      email: 'admin2@example.com',
    },
  ];

  const mockAdminService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
        password: undefined,
        _id: Date.now(),
      };
    }),
    findAll: jest.fn(() => {
      return adminsArray;
    }),
  };

  const mockAuthService = {
    adminSignIn: jest.fn(() => {
      return 'jwtToken';
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [AdminService, AuthService],
    })
      .overrideProvider(AdminService)
      .useValue(mockAdminService)
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AdminController>(AdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an admin', async () => {
    expect(
      await controller.create({
        username: 'johndoe',
        password: 'Qwer12345!@#',
        email: 'johndoe@example.com',
      }),
    ).toEqual({
      _id: expect.any(Number),
      username: 'johndoe',
      email: 'johndoe@example.com',
    });
  });

  it('should find all admins', async () => {
    expect(await controller.findAll()).toEqual(adminsArray);
  });
});
