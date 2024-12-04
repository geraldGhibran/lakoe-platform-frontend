import { registerSchema, RegisterSchema } from '@/validation/register-schema';
import { Box, Button, Flex, Input, Stack, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function RegisterForm() {
  const navigate = useNavigate();
  const { control } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });
  return (
    <>
      <Flex
        display={'flex'}
        flexDirection={'row'}
        h={'100vh'}
        w={'100vw'}
        justifyContent={'center'}
        alignContent={'center'}
      >
        <Box p={'125px 0px'}>
          <Box p={'40px'} h={'350px'} w={'400px'} borderRadius={'10px'}>
            <form>
              <Stack gap={4}>
                <Text fontSize={'4xl'} fontWeight={'bold'}>
                  Register
                </Text>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      {...fieldState}
                      border={'2px solid black'}
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
                      border={'2px solid black'}
                      placeholder="Password"
                      type="password"
                    />
                  )}
                />
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      {...fieldState}
                      border={'2px solid black'}
                      placeholder="Name"
                    />
                  )}
                />

                <Button type="submit" borderRadius={'10px'}>
                  Register
                </Button>
                <Text>
                  Already have an account? Click{' '}
                  <a
                    onClick={() => navigate('/login')}
                    style={{
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      color: 'blue',
                    }}
                  >
                    Here
                  </a>
                </Text>
              </Stack>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
