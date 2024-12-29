import { createToaster } from '@chakra-ui/react';

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
});

export const toasterCart = createToaster({
  placement: 'top',
  pauseOnPageIdle: true,
});
