import React, { useReducer } from 'react';
import PropTypes, { func } from 'prop-types';
// Actions
export const ACTIONS = {
  ADD_NOMINATE: 'addNewNominate',
  REMOVE_NOMINATE: 'removeNominate',
};

const initialState = [];

// Context
export const nominateStore = React.createContext();

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_NOMINATE: {
      const index = state.findIndex((el) => el.imdbID === action.data.imdbID);
      return index === -1 ? [...state, action.data] : state;
    }
    case ACTIONS.REMOVE_NOMINATE:
      return state.filter((movie) => movie.imdbID !== action.payload);
    default:
      return state;
  }
}

function NominateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <nominateStore.Provider value={{ state, dispatch }}>{children}</nominateStore.Provider>;
}
NominateProvider.propTypes = {
  children: PropTypes.objectOf(func).isRequired
}
export default NominateProvider;
