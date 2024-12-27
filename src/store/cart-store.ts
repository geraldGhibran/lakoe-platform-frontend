import { Cart, CartItem } from '@/@types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore extends Cart {
  totalPrice: number;
  setTotalPrice: (totalPrice: number) => void;
  productImage: string;
  setProductImage: (productImage: string) => void;
  description: string;
  setDescription: (description: string) => void;
  length: number;
  setLengthProduct: (length: number) => void;
  width: number;
  setWidthProduct: (width: number) => void;
  height: number;
  setHeightProduct: (height: number) => void;
  quantity: number;
  setTotalQuantity: (quantity: number) => void;
  storeId: number;
  setStoreId: (storeId: number) => void;
  addItem: (p: CartItem) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
  doneCheckout: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  updateTotalPrice: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      products: [],
      quantity: 0,
      storeId: 0,
      setStoreId: (storeId) => set({ storeId }),
      description: '',
      setDescription: (description) => set({ description }),
      length: 0,
      setLengthProduct: (length) => set({ length }),
      width: 0,
      setWidthProduct: (width) => set({ width }),
      height: 0,
      setHeightProduct: (height) => set({ height }),
      productImage: '',
      setProductImage: (productImage) => set({ productImage }),
      setTotalQuantity: (quantity) => set({ quantity }),
      totalPrice: 0,
      setTotalPrice: (totalPrice) => set({ totalPrice }),
      addItem: (p) => {
        set((state) => {
          const existingProductIndex = state.products.findIndex(
            (item) => item.variant.id === p.variant.id
          );

          if (existingProductIndex !== -1) {
            state.products[existingProductIndex].quantity++;
          } else {
            state.products.push(p);
          }

          return { products: [...state.products] };
        });
        // Recalculate total price
        get().updateTotalPrice();
      },
      removeItem: (id) => {
        set((state) => {
          console.log(state);
          const updatedCart = state.products.filter(
            (item) => item.variant.id !== id
          );
          return { products: updatedCart };
        });
        // Recalculate total price
        get().updateTotalPrice();
      },

      removeAll: () => {
        set({ products: [] });
        set({ totalPrice: 0 });
      },
      doneCheckout: () => {
        set({
          products: [],
          totalPrice: 0,
          width: 0,
          length: 0,
          height: 0,
          description: '',
          productImage: '',
          storeId: 0,
        });
        localStorage.removeItem('cart-storage-dummy');
      },
      increaseQuantity: (id) => {
        set((state) => {
          const updatedCart = state.products.map((item) => {
            if (item.variant.id === id) {
              item.quantity++;
            }
            return item;
          });
          return { products: updatedCart };
        });
        // Recalculate total price
        get().updateTotalPrice();
      },
      decreaseQuantity: (id) => {
        set((state) => {
          const updatedCart = state.products
            .map((item) => {
              if (item.variant.id === id) {
                item.quantity--;
                if (item.quantity <= 0) {
                  return null;
                }
              }
              return item;
            })
            .filter(Boolean) as CartItem[];
          return { products: updatedCart };
        });
        // Recalculate total price
        get().updateTotalPrice();
      },
      updateTotalPrice: () => {
        const totalPrice = get().products.reduce(
          (sum, item) => sum + item.variant.price * item.quantity,
          0
        );
        set({ totalPrice });
      },
    }),
    {
      name: 'cart-storage-dummy', // The key in localStorage
    }
  )
);
