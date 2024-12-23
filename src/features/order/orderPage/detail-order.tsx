import { Box, Text, HStack, Image, VStack } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import {
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineItem,
  TimelineRoot,
  TimelineTitle,
} from '@/components/ui/timeline';
import {
  ClipboardIconButton,
  ClipboardRoot,
  ClipboardInput,
} from '@/components/ui/clipboard';
import TrackingModal from '../component/orderItem/modal-tracking';

export default function DetailOrder() {
  return (
    <Box>
      <HStack my={2}>
        <Text color="#0086B4" fontWeight={500}>
          Daftar Pesanan
        </Text>
        <Icon icon="tabler:chevron-right" color="gray" width={25} height={25} />
        <Text>Name product</Text>
      </HStack>
      <Box bgColor={'white'} p={5} rounded={'md'}>
        <HStack alignItems={'start'}>
          <Box>
            <Icon
              icon="pajamas:review-list"
              color="#0086B4"
              width={20}
              height={20}
            />
          </Box>
          <Box>
            <Text
              mx={2}
              px={2}
              bgColor={'yellow'}
              rounded={'md'}
              width={'fit-content'}
            >
              Status
            </Text>
            <Text px={2} py={2}>
              Pesanan akan dibatalkan bila pembayaran tidak dilakukan sampai
              <Text as={'span'} fontWeight={500}>
                {' '}
                10 Agustus 2023 - 00:00 WIB.
              </Text>{' '}
              Silakan tunggu sampai pembayaran terkonfirmasi sebelum mengirimkan
              barang.
            </Text>
            <Box>
              <AccordionRoot collapsible unstyled>
                <AccordionItem
                  key={'sembunyikan'}
                  value={'sembunyikan'}
                  width={'200px'}
                >
                  <AccordionItemTrigger
                    display="flex"
                    alignItems="end"
                    gap="10px"
                    mx={2}
                    py={1}
                    color={'cyan.500'}
                  >
                    Sembunyikan
                  </AccordionItemTrigger>
                  <AccordionItemContent mx={2}>
                    <Box
                      border={'1px solid #E6E6E6'}
                      rounded={'md'}
                      width={'500px'}
                      p={10}
                    >
                      <TimelineRoot maxW="400px">
                        <TimelineItem>
                          <TimelineConnector bgColor={'cyan.100'}>
                            <Box
                              borderRadius={'full'}
                              bgColor={'cyan.500'}
                              width={'10px'}
                              height={'10px'}
                            ></Box>
                          </TimelineConnector>
                          <TimelineContent>
                            <TimelineTitle>Pesanan Diproses</TimelineTitle>
                            <TimelineDescription>
                              13th May 2021
                            </TimelineDescription>
                            <Text textStyle="sm">
                              We shipped your product via <strong>FedEx</strong>{' '}
                              and it should arrive within 3-5 business days.
                            </Text>
                          </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                          <TimelineConnector bgColor={'gray.100'}>
                            <Box
                              borderRadius={'full'}
                              bgColor={'gray.300'}
                              width={'10px'}
                              height={'10px'}
                            ></Box>
                          </TimelineConnector>
                          <TimelineContent>
                            <TimelineTitle textStyle="sm">
                              Pembayaran Terverifikasi
                            </TimelineTitle>
                            <TimelineDescription>
                              18th May 2021
                            </TimelineDescription>
                          </TimelineContent>
                        </TimelineItem>

                        <TimelineItem>
                          <TimelineConnector bgColor={'gray.100'}>
                            <Box
                              borderRadius={'full'}
                              bgColor={'gray.300'}
                              width={'10px'}
                              height={'10px'}
                            ></Box>
                          </TimelineConnector>
                          <TimelineContent>
                            <TimelineTitle textStyle="sm">
                              Pesanan Dibuat
                            </TimelineTitle>
                            <TimelineDescription>
                              20th May 2021, 10:30am
                            </TimelineDescription>
                          </TimelineContent>
                        </TimelineItem>
                      </TimelineRoot>
                    </Box>
                  </AccordionItemContent>
                </AccordionItem>
              </AccordionRoot>
            </Box>
          </Box>
        </HStack>
      </Box>
      <Box bgColor={'white'} p={5} rounded={'md'} my={4}>
        <HStack justifyContent={'space-between'} my={2}>
          <HStack>
            <Icon
              icon="solar:calendar-date-broken"
              color="#0086B4"
              width={20}
              height={20}
            />
            <Text fontWeight={500} px={2}>
              Tanggal
            </Text>
          </HStack>
          <Text fontSize={'sm'} color={'gray'}>
            09 Agustus 2023 - 19:43 WIB
          </Text>
        </HStack>
        <HStack justifyContent={'space-between'} my={2}>
          <HStack>
            <Icon
              icon="iconamoon:invoice-fill"
              color="#0086B4"
              width={20}
              height={20}
            />
            <Text fontWeight={500} px={2}>
              Invoice
            </Text>
          </HStack>
          <ClipboardRoot value="INV/20230809/MPL/00000239">
            <HStack>
              <ClipboardIconButton me="-5" bgColor={'transparent'} />
              <ClipboardInput
                value="INV/20230809/MPL/00000239"
                border="none"
                w={'215px'}
                readOnly={true}
                color={'gray'}
                fontSize={'sm'}
                mr={'-4'}
              />
            </HStack>
          </ClipboardRoot>
        </HStack>
        <HStack justifyContent={'space-between'} my={2}>
          <HStack>
            <Icon
              icon="ix:user-profile"
              color="#0086B4"
              width={20}
              height={20}
            />
            <Text fontWeight={500} px={2}>
              Pembeli
            </Text>
          </HStack>
          <HStack>
            <Icon icon="logos:whatsapp-icon" width={25} height={25} />
            <Text fontSize={'sm'} color={'gray'}>
              Faisal Yulianto
            </Text>
          </HStack>
        </HStack>
      </Box>
      <Box my={4} p={4} bg={'white'}>
        <HStack>
          <Icon
            icon="fluent-mdl2:product-release"
            width={20}
            height={20}
            color={'#0086B4'}
          />
          <Text fontWeight={500} px={2}>
            Detail Produk
          </Text>
        </HStack>
        <HStack
          border={'1px solid #E6E6E6'}
          rounded={'md'}
          my={2}
          p={4}
          justifyContent={'space-between'}
        >
          <HStack>
            <Image
              src="/cardImage/Rectangle 40352.png"
              width={20}
              height={20}
            ></Image>
            <Box>
              <Text fontWeight={500}>
                CREWNECK BASIC - BLACK | sweter polos hoodie polos crewneck - S
              </Text>
              <Text fontSize={'sm'} color={'gray'}>
                1 x Rp 150.000
              </Text>
            </Box>
          </HStack>

          <VStack>
            <Text fontSize={'sm'} color={'gray'}>
              Total Belanja
            </Text>
            <Text fontWeight={500}>Rp 180.000</Text>
          </VStack>
        </HStack>
      </Box>
      <Box my={4} p={4} bg={'white'}>
        <HStack justifyContent={'space-between'}>
          <HStack>
            <Icon
              icon="la:shipping-fast"
              width={20}
              height={20}
              color={'#0086B4'}
            />
            <Text fontWeight={500} px={2}>
              Detail Pengiriman
            </Text>
          </HStack>
          <TrackingModal />
        </HStack>
        <HStack my={4} mx={10} alignItems="flex-start">
          <VStack alignItems={'flex-start'} minW="120px">
            <Box>
              <Text fontSize={'sm'} color={'gray'}>
                Kurir
              </Text>
            </Box>
            <Box>
              <Text fontSize={'sm'} color={'gray'}>
                No. Resi
              </Text>
            </Box>
            <Box>
              <Text fontSize={'sm'} color={'gray'}>
                Alamat
              </Text>
            </Box>
          </VStack>
          <VStack alignItems={'flex-start'} flex="1">
            <Box>
              <Text fontSize={'sm'} fontWeight={500}>
                JNE - Reguler
              </Text>
            </Box>
            <Box>
              <Text fontSize={'sm'} color={'gray'}>
                -
              </Text>
            </Box>
            <Box>
              <Text fontSize={'sm'} color={'gray'}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad in
                recusandae vitae, quos quam repellendus dolorem ullam eius totam
                quaerat?
              </Text>
            </Box>
          </VStack>
        </HStack>
      </Box>
      <Box my={4} p={4} bg={'white'}>
        <HStack>
          <Icon
            icon="fluent:payment-24-regular"
            width={20}
            height={20}
            color={'#0086B4'}
          />
          <Text fontWeight={500} px={2}>
            Rincian Pembayaran
          </Text>
        </HStack>
        <HStack my={1} mx={10} justifyContent="space-between">
          <Text color={'gray'} fontSize={'sm'}>
            Total Harga ( 1 barang )
          </Text>
          <Text fontWeight={500}>Rp 180.000</Text>
        </HStack>
        <HStack my={1} mx={10} justifyContent="space-between">
          <Text color={'gray'} fontSize={'sm'}>
            Total Ongkos Kirim ( 10Kg )
          </Text>
          <Text fontWeight={500}>Rp 180.000</Text>
        </HStack>
        <HStack my={1} mx={10} justifyContent="space-between">
          <Text color={'gray'} fontSize={'sm'}>
            Diskon
          </Text>
          <Text fontWeight={500}>Rp 0</Text>
        </HStack>
        <HStack
          my={1}
          mx={10}
          pb={2}
          justifyContent="space-between"
          borderBottom={'1px solid #E6E6E6'}
        >
          <Text color={'gray'} fontSize={'sm'}>
            Biaya Pelayanan
          </Text>
          <Text fontWeight={500}>Rp 0</Text>
        </HStack>
        <HStack my={1} mx={10} justifyContent="space-between">
          <Text fontWeight={500}>Diskon</Text>
          <Text fontWeight={500}>Rp 190.000</Text>
        </HStack>
      </Box>
    </Box>
  );
}
