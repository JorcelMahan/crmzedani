import {
  SELECT_PRODUCT,
  AMOUNT_PRODUCTS,
  SELECT_PROMOTORA,
  RESET_STATE,
} from '../../types';

const addQuantity = (shoes, newShoe) => {
  const shoeFind = shoes.find(
    (shoe) => shoe.id === newShoe.id && shoe.sizeSale === newShoe.sizeSale
  );
  console.log(shoeFind);
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
    case SELECT_PROMOTORA:
      return {
        ...state,
        promotora: action.payload,
      };
    case AMOUNT_PRODUCTS:
      return {
        ...state,
        total: state.products.reduce(
          (acum, obj) => acum + obj.precioPublico,
          0
        ),
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
