import { SELECT_USERNAME, DESELECT_USERNAME } from '../../types/index';

export default (state, action) => {
  switch (action.type) {
    case SELECT_USERNAME:
      return {
        ...state,
        user: action.payload,
      };
    case DESELECT_USERNAME:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
