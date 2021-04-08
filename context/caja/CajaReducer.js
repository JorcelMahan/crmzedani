import { SET_CAJA } from '../../types';

const CajaReducer = (state, action) => {
  switch (action.type) {
    case SET_CAJA:
      return {
        ...state,
        caja: action.payload,
      };
    default:
      return state;
  }
};

export default CajaReducer;
