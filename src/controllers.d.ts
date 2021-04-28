interface IAuthController {
  handleSignIn(email: string, password: string): SignInSuccessResponse;
  handleSignUp(email: string, username: string, password: string): any;
}