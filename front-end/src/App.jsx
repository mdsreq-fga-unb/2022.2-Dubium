import "./App.css";

import Header from "./components/header";
import Footer from "./components/footer";
import Forum from "./pages/Forum";
import About from "./pages/About";
import FormularioPergunta from "./pages/Forum/FormularioPergunta";
import RankingUsuarios from "./components/RankingUsuarios";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import PerfilUsuario from "./components/PerfilUsuario";

function App() {
  const [idUsuario, setIdUsuario] = useState();
  const [materiaPesquisada, setMateriaPesquisada] = useState("");

  return (
    <Router>
      <Header setMateriaPesquisada={setMateriaPesquisada} />
      <Routes>
        <Route
          path="/"
          element={<Forum materiaPesquisada={materiaPesquisada} />}
        />
        <Route path="/formulario-pergunta" element={<FormularioPergunta />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/ranking-usuarios"
          element={<RankingUsuarios setIdUsuario={setIdUsuario} />}
        />
        <Route
          path="/usuario"
          element={<PerfilUsuario idUsuario={idUsuario} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
