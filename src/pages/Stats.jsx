import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";

const API_URL = "https://t4e-testserver.onrender.com/api";
const PASSWORD = "562527";

export default function Stats() {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const res = await fetch(`${API_URL}/orders?password=${PASSWORD}`);
        const data = await res.json();
        const orders = Array.isArray(data) ? data : data.orders || [];
        dispatch({ type: "SET_ORDERS", payload: orders });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };
    if (state.orders.length === 0) fetchOrders();
  }, []);

  const orders = state.orders;
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(
    (o) => (o.status || "").toLowerCase() === "delivered"
  ).length;
  const cancelledOrders = orders.filter(
    (o) => (o.status || "").toLowerCase() === "cancelled"
  ).length;

  useEffect(() => {
    window.appState = {
      totalOrders,
      deliveredOrders,
      cancelledOrders,
    };
  }, [totalOrders, deliveredOrders, cancelledOrders]);

  if (state.loading) return <div className="loading">Loading...</div>;

  return (
    <div className="page">
      <h1>Stats</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total Orders</span>
          <span className="stat-value" data-testid="total-orders">{totalOrders}</span>
        </div>
        <div className="stat-card delivered">
          <span className="stat-label">Delivered</span>
          <span className="stat-value" data-testid="delivered-orders">{deliveredOrders}</span>
        </div>
        <div className="stat-card cancelled">
          <span className="stat-label">Cancelled</span>
          <span className="stat-value" data-testid="cancelled-orders">{cancelledOrders}</span>
        </div>
      </div>
    </div>
  );
}