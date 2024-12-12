import {
  Box,
  Button,
  Fieldset,
  Flex,
  Group,
  Input,
  InputAddon,
  Table,
  Text,
  Textarea,
} from '@chakra-ui/react';
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';
import { Field } from '@/components/ui/field';
import { Link } from 'react-router-dom';
import { LuMapPinOff } from 'react-icons/lu';
import PopUpLocation from './popUpLocation';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { IoIosArrowForward } from 'react-icons/io';
import { FaArrowRight } from 'react-icons/fa6';

export default function Checkout() {
  return (
    <Box padding="10px 100px" pb="100px">
      <Text fontSize="30px" fontWeight="medium" mb="20px">
        Checkout
      </Text>
      <Flex gap="20px">
        {/* Formulir */}
        <Box display="flex" flexDir="column" gap="20px" width="4/6">
          {/* Status Checkout */}
          <Flex borderBottom="1px solid gainsboro">
            <Box
              display="flex"
              flexDir="column"
              padding="10px 20px"
              borderBottom="2px solid blue"
              justifyContent="start"
              alignItems="start"
            >
              <Text color="blue">Langkah 1</Text>
              <Text fontWeight="medium">Info Pengiriman</Text>
            </Box>
            <Box
              display="flex"
              padding="10px 20px"
              flexDir="column"
              justifyContent="start"
              alignItems="start"
            >
              <Text color="gray">Langkah 2</Text>
              <Text fontWeight="medium">Metode Pembayaran</Text>
            </Box>
          </Flex>
          {/* Form Informasi Kontak */}
          <Flex
            flexDir="column"
            padding="20px"
            rounded="lg"
            gap="20px"
            border="1px solid gainsboro"
          >
            <Text fontSize="20px" fontWeight="medium">
              Informasi Kontak
            </Text>
            <Fieldset.Root width="1/2">
              <Field position="relative" label="Nama Kontak">
                <Input px="20px" border="1px solid gray" name="name" />
                <Text position="absolute" right="0" bottom="-25px">
                  0 / 50
                </Text>
              </Field>

              <Field label="Alamat Email">
                <Input
                  px="20px"
                  border="1px solid gray"
                  name="email"
                  type="email"
                />
              </Field>

              <Field position="relative" label="Nomor WhatsApp">
                <Group
                  width="full"
                  rounded="md"
                  _focus={{ border: 'red' }}
                  attached
                >
                  <InputAddon bgColor="gainsboro">+62</InputAddon>
                  <Input
                    px="20px"
                    roundedEnd="md"
                    placeholder="Phone number..."
                  />
                  <Link to="/login">
                    <Button
                      top="-25px"
                      color="blue"
                      boxSize="auto"
                      fontWeight="medium"
                      right="0"
                      position="absolute"
                    >
                      Masuk
                    </Button>
                  </Link>
                </Group>
              </Field>
              <Text fontSize="10px">
                Kami akan mengirimkan konfirmasi dan informasi perubahan status
                pesanan ke WhatsApp kamu
              </Text>
            </Fieldset.Root>
          </Flex>

          {/* Form Alamat Pengiriman */}
          <Flex
            flexDir="column"
            padding="20px"
            rounded="lg"
            gap="20px"
            border="1px solid gainsboro"
          >
            <Text fontSize="20px" fontWeight="medium">
              Alamat Pengiriman
            </Text>
            <Fieldset.Root width="full">
              <Field label="Nama Penerima">
                <Input px="20px" border="1px solid gray" name="name" />
              </Field>

              <Field label="Nomor HP">
                <Group
                  width="full"
                  border="1px solid gray"
                  rounded="md"
                  attached
                >
                  <InputAddon bgColor="gainsboro">+62</InputAddon>
                  <Input px="20px" placeholder="Phone number..." />
                </Group>
              </Field>
            </Fieldset.Root>
            <Field label="Kecamatan">
              <NativeSelectRoot size="md" width="full">
                <NativeSelectField>
                  <option value="react">React</option>
                  <option value="vue">Vue</option>
                  <option value="svelte">Svelte</option>
                  <option value="angular">Angular</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>

            <Field label="Kelurahan">
              <NativeSelectRoot size="md" width="full">
                <NativeSelectField>
                  <option value="react">React</option>
                  <option value="vue">Vue</option>
                  <option value="svelte">Svelte</option>
                  <option value="angular">Angular</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>

            <Field label="Detail Alamat" required>
              <Textarea
                padding="10px"
                minHeight="100px"
                border="1px solid gray"
                placeholder="isi dengan jalan, nomor rumah, nomor gedung, lantai atau nomor unit"
              />
            </Field>
            <Field label="Pin Alamat (Pilihan)">
              <Flex
                justify="space-between"
                padding="20px"
                rounded="md"
                border="1px solid gray"
                width="full"
                bgColor="gainsboro"
              >
                <Flex color="gray" alignItems="center" gap="10px">
                  <LuMapPinOff />
                  Belum Pinpoint
                </Flex>
                <PopUpLocation />
              </Flex>
            </Field>
          </Flex>
        </Box>

        {/* Ringkasan Pembayaran */}
        <Box gap="20px" display="flex" flexDir="column" width="2/6">
          <Flex gap="20px" flexDir="column">
            <Link to="">
              <Flex
                rounded="lg"
                cursor="pointer"
                fontWeight="bold"
                alignItems="center"
                padding="15px"
                gap="10px"
                border="1px solid black"
              >
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid blue"
                  rounded="full"
                >
                  <MdOutlineAttachMoney color="blue" />
                </Box>
                <Text>Gunakan / Masukan Voucer</Text>
                <IoIosArrowForward />
              </Flex>
            </Link>

            {/* Total Pembayaran */}
            <Box
              border="1px solid blue"
              bgColor="#E5F2FF"
              rounded="lg"
              display="flex"
              padding="20px"
              flexDir="column"
            >
              <Text fontSize="20px" fontWeight="bold" py="8px">
                Ringkasan Pesanan
              </Text>
              <Table.Root size="sm" unstyled>
                <Table.Header>
                  <Table.Row bgColor="#E5F2FF">
                    <Table.ColumnHeader textAlign="start" color="gray">
                      Total Harga (1)
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="gray" textAlign="end">
                      Rp 567
                    </Table.ColumnHeader>
                  </Table.Row>
                  <Table.Row bgColor="#E5F2FF">
                    <Table.ColumnHeader py="5px" textAlign="start" color="gray">
                      Biaya Pengiriman
                    </Table.ColumnHeader>
                    <Table.ColumnHeader color="gray" textAlign="end">
                      Rp 0
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row
                    fontSize="20px"
                    fontWeight="bold"
                    bgColor="#E5F2FF"
                    borderTop="1px solid gainsboro"
                    borderBottom="transparent"
                  >
                    <Table.Cell py="5px" color="gray">
                      Total
                    </Table.Cell>
                    <Table.Cell textAlign="end">Rp 567</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table.Root>
            </Box>
            {/* Catatan */}
            <Box
              border="1px solid blue"
              rounded="lg"
              display="flex"
              gap="20px"
              padding="30px"
              flexDir="column"
            >
              <Flex gap="10px" fontSize="20px" fontWeight="bold">
                Catatan <Text color="gray">(Pilihan)</Text>
              </Flex>
              <Field position="relative" required>
                <Textarea
                  border="1px solid gray"
                  minHeight="100px"
                  padding="10px"
                  placeholder="Tulis catatan / instruksi pesananmu"
                />
                <Text
                  fontSize="12px"
                  position="absolute"
                  right="0"
                  bottom="-20px"
                >
                  0 / 150
                </Text>
              </Field>
            </Box>
          </Flex>
          <Button
            type="submit"
            _active={{ shadow: 'sm' }}
            shadow="md"
            color="white"
            bgColor="blue"
          >
            <Text>Pilih Pembayaran</Text>
            <FaArrowRight />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
