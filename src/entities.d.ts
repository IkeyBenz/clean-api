type User = {
  id: string;
  username: string;
}

type AuthCredentials = {
  email: string;
  passwordHash: string;
  userId: string;
}