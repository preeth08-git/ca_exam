import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { Link } from "react-router-dom";

function Orders() {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const data = [
      {
        orderId: 1,
        customerName: "John",
        restaurant: "Dominos",
        items: [{ name: "Pizza", price: 200, quantity: 2 }],
        totalAmount: 400,
        status: "delivered",
        deliveryTime: "30 mins",
        rating: 4
      },
      {
        orderId: 2,
        customerName: "Alice",
        restaurant: "KFC",
        items: [{ name: "Burger", price: 150, quantity: 1 }],
        totalAmount: 150,
        status: "cancelled",
        deliveryTime: "20 mins",
        rating: 3
      }
    ];

    dispatch({ type: "SET_ORDERS", payload: data });
  }, []);

  return (
    <>
      {state.orders.map(order => (
        <div data-testid="order-item" key={order.orderId}>
          <Link to={`/orders/${order.orderId}`}>
            {order.customerName} - ₹{order.totalAmount}
          </Link>
        </div>
      ))}
    </>
  );
}

export default Orders;