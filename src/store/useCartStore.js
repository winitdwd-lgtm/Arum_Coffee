import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cart: [],
  addToCart: (item, selectedSize = null) => {
    set((state) => {
      // Create a unique cart ID using the item ID and the selected size
      const cartItemId = selectedSize ? `${item.id}-${selectedSize.name}` : item.id;
      
      const existingIndex = state.cart.findIndex((i) => i.cartItemId === cartItemId);
      
      if (existingIndex >= 0) {
        const newCart = [...state.cart];
        newCart[existingIndex].quantity += 1;
        return { cart: newCart };
      }
      
      // Determine the price to use (base price or size price)
      const priceStr = selectedSize ? selectedSize.price : item.price;
      const priceVal = parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;

      const newCartItem = {
        ...item,
        cartItemId,
        selectedSize: selectedSize ? selectedSize.name : null,
        displayPrice: priceStr,
        priceVal,
        quantity: 1
      };
      
      return { cart: [...state.cart, newCartItem] };
    });
  },
  removeFromCart: (cartItemId) => {
    set((state) => ({
      cart: state.cart.filter((i) => i.cartItemId !== cartItemId)
    }));
  },
  updateQuantity: (cartItemId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(cartItemId);
      return;
    }
    set((state) => ({
      cart: state.cart.map((i) => 
        i.cartItemId === cartItemId ? { ...i, quantity } : i
      )
    }));
  },
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + (item.priceVal * item.quantity), 0);
  }
}));
