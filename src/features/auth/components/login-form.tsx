import { Box, Flex, Image, Input, Stack, Text } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSigninForm } from '../hooks/use-login';
import { Button } from '@/components/ui/button';
import file from '@/assets/images/login.svg';

export function LoginForm() {
  const navigate = useNavigate();

  const { control, onSubmit, errors, isSubmitting } = useSigninForm();

  return (
    <Flex height="100vh" bgColor="white">
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Box py="125px">
          <Box py="40px" h="350px" w="400px" borderRadius="10px">
            <form style={{ color: 'black' }} onSubmit={onSubmit}>
              <Stack gap={4}>
                <Text color="black" fontSize="4xl" fontWeight="bold">
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
                      border="2px solid black"
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
                <Button
                  bgColor="blue"
                  color="white"
                  loading={isSubmitting}
                  type="submit"
                  borderRadius="10px"
                >
                  Login
                </Button>
              </Stack>
            </form>
            <Text color="black" mt="10px">
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
      <Flex flex={1}>
        <Image alt={'Login Image'} objectFit={'cover'} src={file} />
      </Flex>
    </Flex>
  );
}
