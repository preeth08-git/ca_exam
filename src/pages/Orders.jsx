import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const API_URL = "https://t4e-testserver.onrender.com/api";
const PASSWORD = "562527";

export default function Orders() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const res = await fetch(`${API_URL}/orders`, {
          headers: { password: PASSWORD },
        });
        const data = await res.json();
        dispatch({ type: "SET_ORDERS", payload: Array.isArray(data) ? data : data.orders || [] });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };
    fetchOrders();
  }, []);

  if (state.loading) return <div className="loading">Loading...</div>;
  if (state.error) return <div className="error">Error: {state.error}</div>;

  return (
    <div className="page">
      <h1>Orders</h1>
      <ul className="list">
        {state.orders.map((order) => (
          <li
            key={order._id || order.id}
            data-testid="order-item"
            className="list-item"
            onClick={() => navigate(`/orders/${order._id || order.id}`)}
          >
            <span className="item-name">{order.customerName || order.name}</span>
            <span className={`item-status status-${(order.status || "").toLowerCase()}`}>
              {order.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}