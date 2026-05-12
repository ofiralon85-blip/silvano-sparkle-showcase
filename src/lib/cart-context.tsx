import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import {
  Cart,
  createCart,
  getCart,
  addToCart as apiAddToCart,
  updateCartLine as apiUpdateCartLine,
  removeCartLine as apiRemoveCartLine,
} from "@/lib/shopify";

const CART_ID_KEY = "silvano:cartId";

interface CartContextValue {
  cart: Cart | null;
  loading: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Initialize cart from localStorage or create a new one
  useEffect(() => {
    const init = async () => {
      const savedId = localStorage.getItem(CART_ID_KEY);
      if (savedId) {
        try {
          const existing = await getCart(savedId);
          if (existing) {
            setCart(existing);
            return;
          }
        } catch (e) {
          console.warn("Couldn't restore cart, creating new one", e);
        }
      }
      // No cart yet - we'll create on first add to avoid empty carts
    };
    init();
  }, []);

  const ensureCart = useCallback(async (): Promise<Cart> => {
    if (cart) return cart;
    const newCart = await createCart();
    localStorage.setItem(CART_ID_KEY, newCart.id);
    setCart(newCart);
    return newCart;
  }, [cart]);

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      setLoading(true);
      try {
        const current = await ensureCart();
        const updated = await apiAddToCart(current.id, variantId, quantity);
        setCart(updated);
        setIsOpen(true);
      } finally {
        setLoading(false);
      }
    },
    [ensureCart]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setLoading(true);
      try {
        const updated = await apiUpdateCartLine(cart.id, lineId, quantity);
        setCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setLoading(true);
      try {
        const updated = await apiRemoveCartLine(cart.id, lineId);
        setCart(updated);
      } finally {
        setLoading(false);
      }
    },
    [cart]
  );

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        isOpen,
        openCart,
        closeCart,
        addItem,
        updateItem,
        removeItem,
        itemCount: cart?.totalQuantity ?? 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
