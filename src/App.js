import "./App.css";
import AllRoutes from "./components/AllRoutes";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";


function App() {

  return (
    <div className="App">
      <Navbar />
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
