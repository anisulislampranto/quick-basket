import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const calculateTotalPrice = (cartProducts) => {
  return cartProducts.reduce((total, item) => total + item.totalPrice, 0);
};

const initialState = {
  isLoading: false,
  isError: false,
  cartProducts: loadCartFromLocalStorage(),
  totalPrice: calculateTotalPrice(loadCartFromLocalStorage()),
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProduct: (state, action) => {
      const { product, quantity } = action.payload;
      const existingProductIndex = state.cartProducts.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex >= 0) {
        state.cartProducts[existingProductIndex].quantity += quantity;
        state.cartProducts[existingProductIndex].totalPrice =
          state.cartProducts[existingProductIndex].price *
          state.cartProducts[existingProductIndex].quantity;
      } else {
        state.cartProducts.push({
          ...product,
          quantity,
          totalPrice: product.price * quantity,
        });
      }

      state.totalPrice = calculateTotalPrice(state.cartProducts);

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cartProducts));
      }
    },
    increaseCartProductQuantity: (state, action) => {
      const productId = action.payload;
      const productIndex = state.cartProducts.findIndex(
        (item) => item._id === productId
      );

      if (productIndex >= 0) {
        state.cartProducts[productIndex].quantity += 1;
        state.cartProducts[productIndex].totalPrice =
          state.cartProducts[productIndex].price *
          state.cartProducts[productIndex].quantity;

        state.totalPrice = calculateTotalPrice(state.cartProducts);

        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.cartProducts));
        }
      }
    },
    decreaseCartProductQuantity: (state, action) => {
      const productId = action.payload;
      const productIndex = state.cartProducts.findIndex(
        (item) => item._id === productId
      );

      if (productIndex >= 0 && state.cartProducts[productIndex].quantity > 1) {
        state.cartProducts[productIndex].quantity -= 1;
        state.cartProducts[productIndex].totalPrice =
          state.cartProducts[productIndex].price *
          state.cartProducts[productIndex].quantity;

        state.totalPrice = calculateTotalPrice(state.cartProducts);

        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(state.cartProducts));
        }
      }
    },
    removeCartProduct: (state, action) => {
      const productId = action.payload;
      state.cartProducts = state.cartProducts.filter(
        (item) => item._id !== productId
      );

      state.totalPrice = calculateTotalPrice(state.cartProducts);

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state.cartProducts));
      }
    },
    clearCart: (state) => {
      state.cartProducts = [];
      state.totalPrice = 0;

      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },
  },
});

export const {
  setCartProduct,
  increaseCartProductQuantity,
  decreaseCartProductQuantity,
  removeCartProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
