import { useColorMode } from './color-mode-provider';

export function useColorModeValue<T>(light: T, dark: T) {
  const { colorMode } = useColorMode();
  return colorMode === 'light' ? light : dark;
}
