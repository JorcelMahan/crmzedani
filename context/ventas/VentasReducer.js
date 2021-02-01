import {
  SELECT_PRODUCT,
  AMOUNT_PRODUCTS,
  SELECT_PROMOTORA,
  RESET_STATE,
  SELECT_CLIENTE,
  REMOVE_PRODUCT,
  ADD_QUANTITY,
  REST_QUANTITY,
  ADD_PRECIO_PROMOCION,
  ADD_FECHA_VENTA,
  ADD_FACTURA,
  ADD_METODO_PAGO,
  ADD_RECIBO_NOTA,
  ADD_MONTO_EFECTIVO,
  ADD_MONTO_TARJETA,
  ADD_MONTO_DEPOSITO,
  ADD_VENDEDOR,
} from "../../types";

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

const VentasReducer = (state, action) => {
  switch (action.type) {
    case SELECT_PRODUCT:
      return {
        ...state,
        products: addQuantity(state.products, action.payload),
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => {
          if (
            product.codigo === action.payload.codigo &&
            product.color === action.payload.color &&
            product.sizeSale === action.payload.sizeSale
          ) {
            return;
          }
          return product;
        }),
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
          (acum, obj) =>
            acum +
            (obj.precioPromocion === 0 || obj.precioPromocion === null
              ? obj.precioPublico
              : obj.precioPromocion) *
              obj.quantity,
          0
        ),
      };
    case ADD_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) => {
          if (
            product.codigo === action.payload.codigo &&
            product.color === action.payload.color &&
            product.sizeSale === action.payload.sizeSale
          )
            product.quantity += 1;
          return product;
        }),
      };
    case REST_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) => {
          if (
            product.codigo === action.payload.codigo &&
            product.color === action.payload.color &&
            product.sizeSale === action.payload.sizeSale
          )
            product.quantity -= 1;
          return product;
        }),
      };
    case ADD_PRECIO_PROMOCION:
      return {
        ...state,
        products: state.products.map((product) => {
          if (
            product.codigo === action.payload.codigo &&
            product.color === action.payload.color &&
            product.sizeSale === action.payload.sizeSale
          ) {
            product.precioPromocion = parseFloat(
              action.payload.precioPromocion
            );
            product.utilidad =
              product.precioPromocion !== 0 && product.precioPromocion > 0
                ? Math.round((product.precioPromocion - product.costo) * 100) /
                  100
                : product.precioPublico - product.costo;
          }
          return product;
        }),
      };
    case RESET_STATE: {
      return {
        ...action.payload,
      };
    }
    case ADD_FECHA_VENTA: {
      return {
        ...state,
        fecha: new Date(action.payload),
      };
    }

    case ADD_RECIBO_NOTA: {
      return {
        ...state,
        reciboNota: action.payload,
      };
    }

    case ADD_FACTURA: {
      return {
        ...state,
        factura: action.payload,
      };
    }

    case ADD_METODO_PAGO: {
      return {
        ...state,
        metodo: action.payload,
      };
    }
    case ADD_MONTO_TARJETA: {
      return {
        ...state,
        montoTarjeta: action.payload,
      };
    }

    case ADD_MONTO_EFECTIVO: {
      return {
        ...state,
        montoEfectivo: action.payload,
      };
    }
    case ADD_MONTO_DEPOSITO: {
      return {
        ...state,
        montoDeposito: action.payload,
      };
    }
    case ADD_VENDEDOR: {
      return {
        ...state,
        vendedor: action.payload,
      };
    }
    default:
      return state;
  }
};

export default VentasReducer;
