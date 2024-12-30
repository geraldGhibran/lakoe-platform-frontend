import { Box, Text, HStack, Image, VStack } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from '@/components/ui/accordion';
import {
  ClipboardIconButton,
  ClipboardRoot,
  ClipboardInput,
} from '@/components/ui/clipboard';
import { useLocation } from 'react-router-dom';
import TrackingModal from '../component/orderItem/modal-tracking';
import { useGetInvoicesId } from '../hooks/use-get-invoices-id';
import { formatCurrency } from '@/features/add-other/format-currency';
import TrackingLayout from '../component/orderItem/tracking-layout';

const getStatusMessage = (status: string) => {
  switch (status.toUpperCase()) {
    case 'UNPAID':
      return {
        bgColor: 'yellow',
        message: (
          <>
            Pesanan akan dibatalkan bila pembayaran tidak dilakukan Silakan
            tunggu sampai pembayaran terkonfirmasi sebelum mengirimkan barang.
          </>
        ),
      };
    case 'PAID':
      return {
        bgColor: 'green',
        message: (
          <>
            Pembayaran telah diterima. Silakan proses pesanan sesuai instruksi
            pada sistem.
          </>
        ),
      };
    case 'PROCESS':
      return {
        bgColor: 'blue',
        message: (
          <>
            Pesanan sedang diproses. Pastikan untuk menginformasikan pembeli
            jika ada kendala.
          </>
        ),
      };
    case 'WAIT_TO_PICKUP':
      return {
        bgColor: 'orange',
        message: (
          <>
            Pesanan sudah siap untuk diambil oleh kurir. Pastikan barang telah
            dikemas dengan baik.
          </>
        ),
      };
    case 'DELIVERING':
      return {
        bgColor: 'orange',
        message: (
          <>
            Pesanan sedang dalam pengiriman. Mohon pastikan status pengiriman
            selalu diperbarui.
          </>
        ),
      };
    case 'DELIVERED':
      return {
        bgColor: 'gray',
        message: (
          <>
            Pesanan telah berhasil dikirimkan. Terima kasih atas kerjasama Anda!
          </>
        ),
      };
    case 'CANCELED':
      return {
        bgColor: 'red',
        message: (
          <>
            Pesanan telah dibatalkan. Silakan hubungi pembeli untuk informasi
            lebih lanjut.
          </>
        ),
      };
    default:
      return {
        bgColor: 'lightgray',
        message: (
          <>
            Status pesanan tidak diketahui. Silakan cek sistem untuk informasi
            lebih lanjut.
          </>
        ),
      };
  }
};

export default function DetailOrder() {
  const { data } = useGetInvoicesId();
  const location = useLocation();
  const status = location.state?.status || 'UNKNOWN';
  const productName = location.state.productName || {};
  const { bgColor, message } = getStatusMessage(status);

  return (
    <Box>
      <HStack my={2}>
        <Text color="#0086B4" fontWeight={500}>
          Daftar Pesanan
        </Text>
        <Icon icon="tabler:chevron-right" color="gray" width={25} height={25} />
        <Text>{productName}</Text>
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
              bgColor={bgColor}
              rounded={'md'}
              width={'fit-content'}
            >
              {status}
            </Text>
            <Text px={2} py={2}>
              {message}
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
                    <TrackingLayout />
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
          <Text fontSize="sm" color="gray.500">
            {data?.invoice?.Product?.[0]?.createdAt
              ? new Date(data.invoice.Product[0].createdAt).toLocaleDateString(
                  'id-ID',
                  {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }
                )
              : 'Tanggal tidak tersedia'}
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
          <ClipboardRoot value={data?.invoice.invoice_id}>
            <HStack>
              <ClipboardIconButton me="-5" bgColor={'transparent'} />
              <ClipboardInput
                value={data?.invoice.invoice_id}
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
              {data?.invoice.receiver_name}
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
              src={data?.invoice?.Product?.[0]?.image?.[0].url}
              width={20}
              height={20}
            ></Image>
            <Box>
              <Text fontWeight={500} mb={2}>
                {productName}
              </Text>
              <Text fontSize={'sm'} color={'gray'}>
                1 x {formatCurrency(data?.invoice?.amount)}
              </Text>
            </Box>
          </HStack>

          <VStack>
            <Text fontSize={'sm'} color={'gray'}>
              Total Belanja
            </Text>
            <Text fontWeight={500}>
              {formatCurrency(data?.invoice?.total_amount)}
            </Text>
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
                {data?.invoice?.Courier?.courier_code}
              </Text>
            </Box>
            <Box>
              <Text fontSize={'sm'} color={'gray'}>
                {data?.invoice?.Courier?.resi}
              </Text>
            </Box>
            <Box>
              <Text fontSize={'sm'} color={'gray'}>
                {data?.invoice?.receiver_address}
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
            Harga 1 Barang
          </Text>
          <Text fontWeight={500}>{formatCurrency(data?.invoice?.amount)}</Text>
        </HStack>
        <HStack my={1} mx={10} justifyContent="space-between">
          <Text color={'gray'} fontSize={'sm'}>
            Ongkos kirim
          </Text>
          <Text fontWeight={500}>
            {formatCurrency(data?.invoice?.courier_price)}
          </Text>
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
          <Text fontWeight={500}>
            {formatCurrency(data?.invoice?.service_charge)}
          </Text>
        </HStack>
        <HStack my={1} mx={10} justifyContent="space-between">
          <Text fontWeight={500}>Total Harga</Text>
          <Text fontWeight={500}>
            {formatCurrency(data?.invoice?.total_amount)}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}
