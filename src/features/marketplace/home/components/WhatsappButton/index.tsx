import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';

export const WhatsappButton = () => {
  const shareURL = 'Halo apakah produk ini tersedia?';
  const openWhatsApp = () => {
    window.open(`https://wa.me/+6285155430837?text=${shareURL}`, '_blank');
  };

  return (
    <Button bg={'green'} onClick={openWhatsApp}>
      {' '}
      <Icon icon="mdi:whatsapp" /> Chat dengan penjual
    </Button>
  );
};
