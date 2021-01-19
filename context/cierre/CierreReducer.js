import {
  ADD_TOTAL_EFECTIVO,
  ADD_TOTAL_TARJETA,
  ADD_BILLETES,
  ADD_MONEDAS,
  ADD_TOTAL_BILLETES,
  ADD_TOTAL_MONEDAS,
} from '../../types';

const CierreReducer = (state, action) => {
  switch (action.type) {
    case ADD_TOTAL_EFECTIVO: {
      return {
        ...state,
        totalEfectivo: action.payload,
      };
    }
    case ADD_TOTAL_MONEDAS: {
      return {
        ...state,
        totalMonedas: action.payload,
      };
    }
    case ADD_TOTAL_BILLETES: {
      return {
        ...state,
        totalBilletes: action.payload,
      };
    }
    case ADD_MONEDAS: {
      return {
        ...state,
        monedas: action.payload,
      };
    }
    case ADD_BILLETES: {
      return {
        ...state,
        billetes: action.payload,
      };
    }
    default:
      return state;
  }
};

export default CierreReducer;
