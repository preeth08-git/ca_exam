import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
function OrderDetails() {
  const { id } = useParams();
  const { state } = useContext(AppContext);

  const order = state.orders.find(o => o.orderId === Number(id));

  if (!order) return <p>Order not found</p>;

  return (
    <div>
      <h2>{order.customerName}</h2>
      <p>{order.restaurant}</p>
      <p>Status: {order.status}</p>
      <p>Total: ₹{order.totalAmount}</p>
    </div>
  );
}

export default OrderDetails;