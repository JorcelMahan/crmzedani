import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { SELECT_USERNAME, DESELECT_USERNAME } from '../../types/index';
const AuthState = ({ children }) => {
  const initialState = {
    user: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const addUsername = (name) => {
    dispatch({
      type: SELECT_USERNAME,
      payload: name,
    });
  };
  const deselectUsername = () => {
    dispatch({
      type: DESELECT_USERNAME,
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        addUsername,
        deselectUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
