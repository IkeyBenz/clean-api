const buildAuthService: ServiceFactory<IAuthService> = ({ Database }) => {
  class AuthService implements IAuthService {
    authCredentials = Database.collection('auth');

    async register(userId: string, password: string) {
      const passwordHash = this.hashPassword(password);
      await this.authCredentials.create({ userId, passwordHash });
    }

    async getTokenFor(userId: string, password: string) {
      const passwordHash = this.hashPassword(password);
      return this.authCredentials.find({ userId, passwordHash }).then(() => {
        return this.generateToken(userId);
      });
    }

    private hashPassword(password: string) {
      return 'hashed' + password;
    }

    private generateToken(userId: string) {
      return userId;
    }
  }

  return new AuthService();
};

export default buildAuthService;
