const buildAuthController: ControllerFactory = ({ AuthService, Responses }) => {
  return new class AuthController implements IAuthController {
    
    async handleSignIn(email: string, password: string) {
      return AuthService.identify(email, password).then((token) => {
        return Responses.auth.createSignInSuccessResponse(token);
      }).catch((err) => {
        return Responses.auth.createSignInFailureResponse(err.message);
      });
    }

    async handleSignUp(email: string, password: string) {
      return AuthService.register(email, password).then(())
    }
  }
}
