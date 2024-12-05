import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/features/auth/services/auth';
import API from '@/libs/axios';
import { useAuthStore } from '@/store/auth';
// import { toaster } from '@/components/ui/toaster';
import { LoginSchema, loginSchema } from '@/validation/login-schema';
import { toaster } from '@/components/ui/toaster-placement';

export const useSigninForm = () => {
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginSchema) => {
      return await signIn(data);
    },
    onSuccess: (data) => {
      const { user, token } = data;

      setUser(user);
      setToken(token);

      Cookies.set('token', token, { expires: 30 });
      Cookies.set('user', JSON.stringify(user), { expires: 30 });

      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      toaster.create({
        title: 'Welcome back!',
        type: 'success',
        duration: 3000,
        description: 'You have successfully logged in.',
      });

      if (user.role === 'ADMIN') {
        navigate('/admin');
      }

      if (user.role === 'SELLER') {
        navigate('/products');
      }
    },
    onError: () => {
      toaster.create({
        title: 'Login failed',
        description: 'Check your email/username or password and try again.',
        type: 'error',
        duration: 3000,
        removeDelay: 2000,
      });
    },
    onMutate: () => {
      toaster.create({
        title: 'Loading...',
        description: 'Were working on it...',
        type: 'info',
        duration: 2000,
        removeDelay: 2000,
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    control,
    onSubmit,
    handleSubmit,
    errors,
    isSubmitting: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
