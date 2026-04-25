import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://t4e-testserver.onrender.com/api";
const PASSWORD = "562527";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API_URL}/orders/${id}`, {
          headers: { password: PASSWORD },
        });
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!order) return <div className="error">Order not found</div>;

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate("/orders")}>← Back</button>
      <h1>Order Details</h1>
      <div className="detail-card">
        {Object.entries(order).map(([key, value]) => (
          <div key={key} className="detail-row">
            <span className="detail-key">{key}</span>
            <span className="detail-value">{String(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}