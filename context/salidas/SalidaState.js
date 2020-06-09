import React, {useReducer} from "react";
import SalidaContext from "./SalidaContext";
import SalidaReducer from "./SalidaReducer";
import {SELECT_PRODUCT, REMOVE_PRODUCT, SELECT_ALMACEN, SELECT_RETIRADO_POR, RESET_STATE, SELECT_TOTAL} from "../../types";

const SalidaState = ({children}) => {
    const initialState = {
        products: [],
        totalProducts: 0,
        almacen: '',
        retiradoPor: '',
    }
    const [state, dispatch] = useReducer(SalidaReducer, initialState);
    const addProduct = product => {
        dispatch({
            type: SELECT_PRODUCT,
            payload: product
        })
    };
    const removeProduct = product => {
        dispatch({
            type: REMOVE_PRODUCT,
            payload: product
        })
    }
    const selectAlmacen = almacen => {
        dispatch({
            type: SELECT_ALMACEN,
            payload: almacen
        })
    };

    const selectRetiradoPor = nombre => {
        dispatch({
            type: SELECT_RETIRADO_POR,
            payload: nombre
        })
    }
    const selectTotal = total => {
        dispatch({
            type: SELECT_TOTAL,
            payload: total
        })
    }
    const resetState = () => {
        dispatch({
            type: RESET_STATE,
            payload: initialState
        })
    }

    return (
        <SalidaContext.Provider
            value={{
                products: state.products,
                totalProducts: state.totalProducts,
                almacen: state.almacen,
                retiradoPor: state.retiradoPor,
                addProduct,
                removeProduct,
                selectAlmacen,
                selectRetiradoPor,
                resetState,
                selectTotal
            }}
        >
            {children}
        </SalidaContext.Provider>
    )
}

export default SalidaState;