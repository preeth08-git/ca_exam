import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

function Stats() {
  const { state } = useContext(AppContext);

  const stats = state.orders.reduce(
    (acc, o) => {
      acc.total++;
      if (o.status === "delivered") acc.delivered++;
      if (o.status === "cancelled") acc.cancelled++;
      return acc;
    },
    { total: 0, delivered: 0, cancelled: 0 }
  );

  useEffect(() => {
    window.appState = stats;
  }, [state]);

  return (
    <>
      <p data-testid="total-orders">{stats.total}</p>
      <p data-testid="delivered-orders">{stats.delivered}</p>
      <p data-testid="cancelled-orders">{stats.cancelled}</p>
    </>
  );
}

export default Stats;