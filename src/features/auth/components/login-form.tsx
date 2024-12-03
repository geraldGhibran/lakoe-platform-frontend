import { loginSchema, LoginSchema } from '@/validation/login-schema';
import { Box, Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const navigate = useNavigate();
  const { control } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <>
      <Flex flexDir="row" h="100vh" w="100vw" justify="center" align="center">
        <Box py="125px">
          <Box py="40px" h="350px" w="400px" borderRadius="10px">
            <form>
              <Stack gap={4}>
                <Text fontSize="4xl" fontWeight="bold">
                  Login
                </Text>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      {...fieldState}
                      border="2px solid black"
                      placeholder="Email"
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      {...fieldState}
                      border="2px solid black"
                      placeholder="Password"
                      type="password"
                    />
                  )}
                />
                <Button type="submit" borderRadius="10px">
                  Login
                </Button>
              </Stack>
            </form>
            <Text mt="10px">
              Don't have an account?{' '}
              <Text
                as="span"
                fontWeight="bold"
                cursor="pointer"
                color={'blue'}
                onClick={() => navigate('/register')}
              >
                Register
              </Text>
            </Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
