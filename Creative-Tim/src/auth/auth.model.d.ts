export interface claim {
  name: string;
  value: string;
}

export interface userCredential {
  email: string;
  password: string;
  // username?: string = "";
}

export interface authResponse {
  token: string;
  expiration: Date;
}

export interface userDTO {
  id: string;
  email: string;
}
