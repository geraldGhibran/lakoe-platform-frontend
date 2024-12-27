import { Cart, CartItem } from '@/@types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore extends Cart {
  totalPrice: number;
  setTotalPrice: (totalPrice: number) => void;
  addItem: (p: CartItem) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  updateTotalPrice: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      products: [],
      totalPrice: 0,
      setTotalPrice: (totalPrice) => set({ totalPrice }),
      addItem: (p) => {
        set((state) => {
          const existingProductIndex = state.products.findIndex(
            (item) => item.product.id === p.product.id
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
          const updatedCart = state.products.filter(
            (item) => item.product.id !== id
          );
          return { products: updatedCart };
        });
        // Recalculate total price
        get().updateTotalPrice();
      },
      removeAll: () => {
        set({ products: [] });
        // Reset total price
        set({ totalPrice: 0 });
      },
      increaseQuantity: (id) => {
        set((state) => {
          const updatedCart = state.products.map((item) => {
            if (item.product.id === id) {
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
              if (item.product.id === id) {
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
          (sum, item) => sum + item.product.price * item.quantity,
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
