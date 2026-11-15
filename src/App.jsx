import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import VideoDetail from "./components/VideoDetail";
import SectionPage from "./components/SectionPage";
import EntryDetail from "./components/EntryDetail";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<VideoDetail />} />

        {/* Guías (Active Directory, labs, notas) */}
        <Route path="/guias" element={<SectionPage section="guias" />} />
        <Route path="/guias/:slug" element={<EntryDetail section="guias" />} />

        {/* HTB (walkthroughs) */}
        <Route path="/htb" element={<SectionPage section="htb" />} />
        <Route path="/htb/:slug" element={<EntryDetail section="htb" />} />

        {/* compatibilidad con enlaces antiguos */}
        <Route path="/walkthrough/:slug" element={<Navigate to="/htb" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
