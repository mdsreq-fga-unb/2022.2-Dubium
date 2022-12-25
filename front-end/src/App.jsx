import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Forum from "./pages/Forum";
import About from "./pages/About";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormularioPergunta from "./pages/Forum/FormularioPergunta";

function App() {
  return (
    <div className="body-app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Forum />} />
          <Route path="/formulario-pergunta" element={<FormularioPergunta />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
