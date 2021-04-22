interface IAuthController {
  handleSignIn(email: string, password: string): SignInSuccessResponse;
  handleSignUp(email: string, password: string): any;
}