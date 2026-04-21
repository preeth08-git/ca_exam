import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Filter() {
  const { dispatch } = useContext(AppContext);

  return (
    <input
      data-testid="filter-input"
      placeholder="Search customer"
      onChange={(e) =>
        dispatch({ type: "FILTER_ORDERS", payload: e.target.value })
      }
    />
  );
}

export default Filter;