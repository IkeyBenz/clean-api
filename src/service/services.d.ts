interface IAuthService {
  getTokenFor(userId: string, password: string): Promise<string>;
  register(userId: string, password: string): Promise<void>;
}

interface IUserService {
  createNewUser(email: string, username: string): Promise<User & Model>;
  getUser(email: string): Promise<User & Model>;
}

type Services = {
  UserService: IUserService;
  AuthService: IAuthService;
};
