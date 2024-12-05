import { UserType } from '@/types/user';
import API from '@/libs/axios';
import { LoginSchema } from '@/validation/login-schema';
import { RegisterSchema } from '@/validation/register-schema';

interface SignInResponse {
  user: UserType;
  token: string;
}

export const signIn = async (data: LoginSchema) => {
  const response = await API.post<SignInResponse>('/auth/login', data).then(
    (res) => res.data
  );
  return response;
};

export const signUp = async (data: RegisterSchema) => {
  return await API.post<{ user: UserType }>('/auth/register', data).then(
    (res) => res.data
  );
};
