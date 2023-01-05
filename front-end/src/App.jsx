import "./App.css";

import Header from "./components/header";
import Footer from "./components/footer";
import Forum from "./pages/Forum";
import About from "./pages/About";
import FormularioPergunta from "./pages/Forum/FormularioPergunta";
import RankingUsuarios from "./components/RankingUsuarios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="body-app">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Forum />} />
          <Route path="/formulario-pergunta" element={<FormularioPergunta />} />
          <Route path="/about" element={<About />} />
          <Route path="/ranking-usuarios" element={<RankingUsuarios />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
