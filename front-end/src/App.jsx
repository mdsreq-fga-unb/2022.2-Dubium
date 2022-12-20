import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import Chat from "./pages/Chat";
import About from "./pages/About";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="body-app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
