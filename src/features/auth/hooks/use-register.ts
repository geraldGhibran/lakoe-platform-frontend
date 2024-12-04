// import { useToast } from "@chakra-ui/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/auth';
import { toaster } from '@/components/ui/toaster';
import { RegisterSchema, registerSchema } from '@/validation/register-schema';

export const useRegisterForm = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: RegisterSchema) => {
      return await signUp(data);
    },
    onSuccess: () => {
      toaster.create({
        title: 'Account created successfully!',
        description: 'Please login with your new account',
        type: 'success',
        duration: 3000,
      });

      navigate('/login');
    },
    onError: (error: string) => {
      toaster.create({
        title: 'Failed to create account',
        description: error || 'An error occurred, please try again',
        type: 'error',
        duration: 3000,
      });
    },
    onMutate: () => {
      toaster.create({
        title: 'Loading...',
        description: 'Were working on it...',
        type: 'info',
        duration: 3000,
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting: mutation.isPending,
  };
};
