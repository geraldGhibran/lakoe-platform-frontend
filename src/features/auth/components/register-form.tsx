import { Button } from '@/components/ui/button';
import { Box, Flex, Image, Input, Stack, Text } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRegisterForm } from '../hooks/use-register';

export function RegisterForm() {
  const navigate = useNavigate();
  const { control, onSubmit, errors, isSubmitting } = useRegisterForm();
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Box p={'125px 0px'}>
          <Box p={'40px'} h={'350px'} w={'400px'} borderRadius={'10px'}>
            <form onSubmit={onSubmit}>
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
                {errors.email && (
                  <Text
                    color={'red.500'}
                    fontSize={'xs'}
                    marginTop={'2'}
                    fontWeight={'medium'}
                  >
                    {errors.email.message}
                  </Text>
                )}
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
                {errors.password && (
                  <Text
                    color={'red.500'}
                    fontSize={'xs'}
                    marginTop={'2'}
                    fontWeight={'medium'}
                  >
                    {errors.password.message}
                  </Text>
                )}
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      {...fieldState}
                      border={'2px solid black'}
                      placeholder="Fullname"
                    />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      {...fieldState}
                      border={'2px solid black'}
                      placeholder="Phone"
                    />
                  )}
                />
                {errors.name && (
                  <Text
                    color={'red.500'}
                    fontSize={'xs'}
                    marginTop={'2'}
                    fontWeight={'medium'}
                  >
                    {errors.name.message}
                  </Text>
                )}
                <Button
                  loading={isSubmitting}
                  type="submit"
                  borderRadius={'10px'}
                >
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
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
        />
      </Flex>
    </Stack>
  );
}
