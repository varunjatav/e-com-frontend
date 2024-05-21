// import logo from './logo.svg';

// import AdminAuth from "./AdminAuth/AdminAuth";
import AdminAuth from "./AdminAuth/AdminAuth";
import "./App.css";
import Address from "./components/Address And Payment/Address";
import Payment from "./components/Address And Payment/Payment";

// import Arrival from "./components/Arrival/Arrival";

import AllRoutes from "./components/AllRoutes";

import Cart from "./components/Cart/Cart.jsx";
import Footer from "./components/Footer/Footer";
// import FreeTryAtHome from "./components/Freetry/FreeTryAtHome";
// import Homepage from "./components/Homepage/Homepage";
import Navbar from "./components/Navbar/Navbar";
import PlanOfPurchase from "./components/Plan/PlanOfPurchase";
import Detail from "./components/SingleProduct/Detail";
import Wishlist from "./components/Wishlist/Wishlist";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <AdminAuth /> */}
      {/* <Payment /> */}
      {/* <Address /> */}
      {/* <Detail /> */}

      <AllRoutes />

      {/* <Homepage /> */}
      {/* <FreeTryAtHome /> */}

      <Footer />
    </div>
  );
}

export default App;
