import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Recursos from "./components/Recursos";
import ComingSoon from "./components/ComingSoon";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <BrowserRouter>
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/academia" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
