import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';
import { Button, Input, Stack, HStack } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import CreateformSchema from '../schema/create-rek';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import API from '@/libs/axios';
import { toaster } from '@/components/ui/toaster-placement';

interface FormValues {
  acc_name: string;
  bank: string;
  acc_number: string;
}

export default function CreateRekening() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(CreateformSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await API.post(`/bank`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bankList'] });
      toaster.create({
        title: 'rekening Message created',
        type: 'success',
        duration: 3000,
        description: 'Your rekening has been created successfully.',
      });
      window.location.reload();
      reset();
    },
    onError: (error) => {
      console.error('Error creating account:', error);
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutation.mutate(data);
  });

  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger width="full" asChild>
          <Button
            _active={{ shadow: 'xs' }}
            shadow="sm"
            color="white"
            bgColor="green"
          >
            Tambah Rekening
          </Button>
        </DialogTrigger>
        <DialogContent bgColor="white" color="black">
          <DialogHeader textAlign="center" borderBottom="1px solid gainsboro">
            <DialogTitle fontSize="md" fontWeight="bold">
              Tambah Rekening
            </DialogTitle>
          </DialogHeader>
          <DialogBody
            color="#464646"
            display="flex"
            flexDir="column"
            gap="20px"
          >
            <form style={{ width: '100%' }} onSubmit={onSubmit}>
              <Stack gap="4" align="flex-start">
                <Field
                  label="Full Name"
                  invalid={!!errors.acc_name}
                  errorText={errors.acc_name?.message}
                >
                  <Input {...register('acc_name')} />
                </Field>
                <Field
                  label="Bank Name"
                  gap="4"
                  width="full"
                  invalid={!!errors.bank}
                  errorText={errors.bank?.message}
                >
                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Select Bank Name"
                      {...register('bank')}
                    >
                      <option value="BCA">BCA (Bank Central Asia)</option>
                      <option value="Mandiri">Mandiri (Bank Mandiri)</option>
                      <option value="BNI">BNI (Bank Negara Indonesia)</option>
                      <option value="BRI">BRI (Bank Rakyat Indonesia)</option>
                      <option value="CIMB">CIMB Niaga (CIMB Niaga Bank)</option>
                      <option value="Danamon">Danamon (Bank Danamon)</option>
                      <option value="Permata">Permata (Bank Permata)</option>
                      <option value="Mega">Mega (Bank Mega)</option>
                      <option value="Sinarmas">Sinarmas (Bank Sinarmas)</option>
                      <option value="BTPN">BTPN (Bank BTPN)</option>
                      <option value="BTN">BTN (Bank Tabungan Negara)</option>
                      <option value="OCBC">OCBC NISP (OCBC NISP Bank)</option>
                      <option value="UOB">UOB (UOB Indonesia)</option>
                      <option value="StandardChartered">
                        Standard Chartered Indonesia
                      </option>
                      <option value="HSBC">HSBC Indonesia</option>
                      <option value="Maybank">Maybank Indonesia</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field>
                <Field
                  label="Account Number"
                  invalid={!!errors.acc_number}
                  errorText={errors.acc_number?.message}
                >
                  <Input {...register('acc_number')} />
                </Field>
                <Button
                  _focus={{ shadow: 'xs' }}
                  shadow="sm"
                  bgColor="green"
                  ml="auto"
                  color="white"
                  type="submit"
                >
                  Tambah Rekening
                </Button>
              </Stack>
            </form>
          </DialogBody>
          <DialogCloseTrigger
            _hover={{ bgColor: 'gainsboro' }}
            border="1px solid gray"
            color="gray"
          />
        </DialogContent>
      </DialogRoot>
    </HStack>
  );
}
