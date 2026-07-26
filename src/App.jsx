import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Blog from "./components/Blog";
import BlogArticle from "./components/BlogArticle";
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
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogArticle />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/academia" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
