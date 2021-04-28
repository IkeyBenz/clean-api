const buildUserService: ServiceFactory<IUserService> = ({ Database }) => {
  class UserService implements IUserService {
    users = Database.collection('user');

    createNewUser(email: string, username: string) {
      return this.users.create({ email, username });
    }

    getUser(email: string) {
      return this.users.find({ email });
    }
  }

  return new UserService();
};

export default buildUserService;
