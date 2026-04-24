import { createContext, useReducer } from "react";

export const AppContext = createContext();

const initialState = {
  orders: []
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ORDERS":
      return { ...state, orders: action.payload };

    case "FILTER_ORDERS":
      return {
        ...state,
        orders: state.orders.filter(o =>
          o.customerName.toLowerCase().includes(action.payload.toLowerCase())
        )
      };

    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};