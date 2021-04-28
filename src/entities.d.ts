interface User {
  email: string;
  username: string;
}

interface AuthCredentials {
  passwordHash: string;
  userId: string;
}
