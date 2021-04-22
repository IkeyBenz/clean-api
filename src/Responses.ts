const AuthResponses = {
  createSignInSuccessResponse: (token: string) => ({
    status: 200,
    cookies: { token },
  }),
  createSignInFailureResponse: (errMsg: string) => ({
    status: 400,
    body: { errMsg },
  }),
}

const ResponsesFactory = {
  auth: AuthResponses,
};

export default ResponsesFactory;
