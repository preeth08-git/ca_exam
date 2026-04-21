import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./Orders";
import OrderDetails from "./OrderDetails";
import Filter from "./Filter";
import Stats from "./Stats";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;