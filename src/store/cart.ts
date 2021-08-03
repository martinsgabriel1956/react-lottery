import { createSlice } from "@reduxjs/toolkit";

type CartGame = {
  cartItem: {
    game_id: number;
    id: string;
    numbers: number[] | string;
    total_price: number;
    type: string;
    color: string;
    date_string: string;
  }[];
  totalPrice: number;
};

type ActionType = {
  gameId: number;
  id: string;
  numbersGame: number[];
  price: number;
  type: string;
  color: string;
};

const initialState: CartGame = {
  cartItem: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    receiveGame(state, action) {
      const { numbersGame, price, type, color, gameId }: ActionType = action.payload;
      let { cartItem } = state;

      let id = Math.random().toString();
      let date = new Date();
      let dateFormatted = `${date.getDate()} / 0${
        date.getMonth() + 1
      } / ${date.getFullYear()}`;

      state.totalPrice += price;
      const gamesCart = cartItem;

      gamesCart.push({
        game_id: gameId,
        id,
        numbers: numbersGame.toString(),
        total_price: price,
        type,
        color,
        date_string: dateFormatted,
      });
    },
    deleteGame(state, action) {
      const { id, price }: ActionType = action.payload;

      state.totalPrice -= price;
      state.cartItem = state.cartItem.filter((item) => item.id !== id);
    },
    clearCart(state) {
      state.totalPrice = 0;
      state.cartItem = [];
    },
  },
});

export const cartActions = cartSlice.actions;
