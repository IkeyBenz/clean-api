interface AuthService {
  identify(email: string, password: string): Promise<string>;
  register(email: string, password: string): Promise<AuthCredentials>;
}

type Services = {
  // UserService: UserService;
  AuthService: AuthService;
}