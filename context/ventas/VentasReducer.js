
import {
  SELECT_PRODUCT,
  AMOUNT_PRODUCTS,
  SELECT_PROMOTORA,
  RESET_STATE,
  SELECT_CLIENTE,
  REMOVE_PRODUCT,
  ADD_QUANTITY,
  REST_QUANTITY,
} from '../../types';

const addQuantity = (shoes, newShoe) => {
  const shoeFind = shoes.find(
    (shoe) => shoe.id === newShoe.id && shoe.sizeSale === newShoe.sizeSale
  );
  if (shoeFind) {
    return shoes.map((shoe) =>
      shoe.id === newShoe.id && shoe.sizeSale === newShoe.sizeSale
        ? { ...shoe, quantity: shoe.quantity + 1 }
        : shoe
    );
  }
  return [...shoes, { ...newShoe, quantity: 1 }];
};

export default (state, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return {
        ...state,
        products: addQuantity(state.products, action.payload),
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };
    case SELECT_PROMOTORA:
      return {
        ...state,
        promotora: action.payload,
      };
    case SELECT_CLIENTE:
      return {
        ...state,
        cliente: action.payload,
      };
    case AMOUNT_PRODUCTS:
      return {
        ...state,
        total: state.products.reduce(
          (acum, obj) => acum + obj.precioPublico * obj.quantity,
          0
        ),
      };
    case ADD_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload) product.quantity += 1;
          return product;
        }),
      };
    case REST_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload) product.quantity -= 1;
          return product;
        }),
      };
    case RESET_STATE: {
      return {
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
