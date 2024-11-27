'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
// import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

export function Provider(props: React.PropsWithChildren) {
  return (
    <ChakraProvider value={defaultSystem}>
      {/* <ColorModeProvider {...props} /> */}
      {props.children}
    </ChakraProvider>
  );
}
