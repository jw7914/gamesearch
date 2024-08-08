import { HashRouter, Routes, Route } from "react-router-dom";
// Components
import Navbar from "./components/static/Navbar";
//Pages
import Home from "./components/pages/Home";
import Result from "./components/pages/Result";
function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
