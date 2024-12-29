import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button, Input, Stack, HStack } from '@chakra-ui/react';
import 'leaflet/dist/leaflet.css';
import { Field } from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';

interface FormValues {
  fullName: string;
  bankName: string;
  accountNumber: string;
}

export default function EditRekening() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <HStack wrap="wrap" gap="4">
      <DialogRoot placement="center" motionPreset="slide-in-bottom">
        <DialogTrigger width="full" asChild>
          <Button
            _active={{ shadow: 'xs' }}
            shadow="sm"
            color="white"
            bgColor="blue"
          >
            Edit Rekening
          </Button>
        </DialogTrigger>
        <DialogContent bgColor="white" color="black">
          <DialogHeader textAlign="center" borderBottom="1px solid gainsboro">
            <DialogTitle fontSize="md" fontWeight="bold">
              Edit Rekening
            </DialogTitle>
          </DialogHeader>
          <DialogBody
            color="#464646"
            display="flex"
            flexDir="column"
            gap="20px"
          >
            <form style={{ width: 'full' }} onSubmit={onSubmit}>
              <Stack gap="4" align="flex-start">
                <Field
                  label="Full Name"
                  invalid={!!errors.fullName}
                  errorText={errors.fullName?.message}
                >
                  <Input
                    {...register('fullName', {
                      required: 'Full Name is required',
                    })}
                  />
                </Field>
                <Field
                  label="Bank Name"
                  gap="4"
                  width="full"
                  invalid={!!errors.bankName}
                  errorText={errors.bankName?.message}
                >
                  <NativeSelectRoot>
                    <NativeSelectField
                      placeholder="Select Bank Name"
                      {...register('bankName', {
                        required: 'Bank Name is required',
                      })}
                    >
                      <option value="react">React</option>
                      <option value="vue">Vue</option>
                      <option value="angular">Angular</option>
                      <option value="svelte">Svelte</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </Field>
                <Field
                  label="Account Number"
                  invalid={!!errors.accountNumber}
                  errorText={errors.accountNumber?.message}
                >
                  <Input
                    {...register('accountNumber', {
                      required: 'Account Number is required',
                    })}
                  />
                </Field>
                <Button
                  _focus={{ shadow: 'xs' }}
                  shadow="sm"
                  bgColor="blue"
                  ml="auto"
                  color="white"
                  type="submit"
                >
                  Update Rekening
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
