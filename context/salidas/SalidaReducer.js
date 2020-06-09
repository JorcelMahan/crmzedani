import {SELECT_PRODUCT, REMOVE_PRODUCT, SELECT_RETIRADO_POR, SELECT_ALMACEN, RESET_STATE, SELECT_TOTAL} from "../../types";

export default (state, action) => {
    switch (action.type) {
        case SELECT_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case REMOVE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(
                    product => {
                        if (product.codigo === action.payload.codigo && product.color === action.payload.color && product.sizeSale === action.payload.sizeSale) {
                            return;
                        }
                        return product;
                    }
                )
            }
        case SELECT_RETIRADO_POR:
            return {
                ...state,
                retiradoPor: action.payload
            }
        case SELECT_ALMACEN:
            return {
                ...state,
                almacen: action.payload
            }
        case SELECT_TOTAL:
            return {
                ...state,
                totalProducts: action.payload
            }
        case RESET_STATE: {
            return {
                ...action.payload
            }
        }

        default:
            return state;
    }
}