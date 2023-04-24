import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans";
import VanDetail from "./pages/VanDetail";
import "./server";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Link className="site-logo" to="/">
          #VanLife
        </Link>
        <nav>
          <Link to="/vans">Vans</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vans" element={<Vans />} />
        <Route path="/vans/:id" element={<VanDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
