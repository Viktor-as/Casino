export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterSuccess = {
  id: string;
  name: string;
};

export type RegisterResult =
  | { ok: true; data: RegisterSuccess }
  | { ok: false; message: string };
