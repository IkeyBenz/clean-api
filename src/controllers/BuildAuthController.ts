import { handleAsyncError } from 'util/decorators';

const buildAuthController: ControllerFactory = ({
  AuthService,
  UserService,
  Responses,
}) => {
  class AuthController implements IAuthController {
    @handleAsyncError(Responses.auth.createSignInFailureResponse)
    async handleSignIn(email: string, password: string) {
      return UserService.getUser(email)
        .then((user) => {
          return AuthService.getTokenFor(user.id, password);
        })
        .then((token) => {
          return Responses.auth.createSignInSuccessResponse(token);
        });
    }

    @handleAsyncError(Responses.auth.createSignInFailureResponse)
    async handleSignUp(email: string, username: string, password: string) {
      return UserService.createNewUser(email, username)
        .then((user) => {
          return AuthService.register(user.id, password).then(() => {
            return AuthService.getTokenFor(user.id, password);
          });
        })
        .then((token) => {
          return Responses.auth.createSignUpSuccessResponse(token);
        });
    }
  }

  return new AuthController();
};

export default buildAuthController;
