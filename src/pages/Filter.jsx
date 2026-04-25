import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const API_URL = "https://t4e-testserver.onrender.com/api";
const PASSWORD = "562527";

export default function Filter() {
  const { state, dispatch } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const res = await fetch(`${API_URL}/orders`, {
          headers: { password: PASSWORD },
        });
        const data = await res.json();
        const orders = Array.isArray(data) ? data : data.orders || [];
        setAllOrders(orders);
        dispatch({ type: "SET_ORDERS", payload: orders });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };
    fetchOrders();
  }, []);

  const filtered = query
    ? allOrders.filter((o) =>
        (o.customerName || o.name || "")
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    : allOrders;

  return (
    <div className="page">
      <h1>Filter Orders</h1>
      <input
        data-testid="filter-input"
        className="filter-input"
        type="text"
        placeholder="Search by customer name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="list">
        {filtered.map((order) => (
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