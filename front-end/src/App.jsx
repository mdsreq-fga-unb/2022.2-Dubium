import "./App.css";

import apiRequest from "./services/api";

import PerguntaSelecionada from "./pages/Forum/PerguntaSelecionada";
import FormularioPergunta from "./pages/Forum/FormularioPergunta";
import RankingUsuarios from "./pages/RankingUsuarios";
import ForumLayout from "./pages/Forum/ForumLayout";
import PerfilUsuario from "./pages/PerfilUsuario";
import ForumBody from "./pages/Forum/ForumBody";
import Header from "./components/header";
import Footer from "./components/footer";
import Sobre from "./pages/Sobre";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/login";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [materiaPesquisada, setMateriaPesquisada] = useState("");

  useEffect(() => {
    apiRequest
      .get("usuarios")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  return (
    <div className="container">
      <Router>
        <Header setMateriaPesquisada={setMateriaPesquisada} />
        <Routes>
          <Route path="/" element={<ForumLayout />}>
            <Route
              index
              element={<ForumBody materiaPesquisada={materiaPesquisada} />}
            />
            <Route
              path="/:id"
              element={<ForumBody materiaPesquisada={materiaPesquisada} />}
            />
            <Route
              path="/pergunta/:idPergunta"
              element={<PerguntaSelecionada usuarios={usuarios} />}
            />
            <Route
              path="/criar-pergunta"
              element={<FormularioPergunta usuarios={usuarios} />}
            />
          </Route>
          <Route
            path="/ranking-usuarios"
            element={<RankingUsuarios usuarios={usuarios} />}
          />
          <Route path="/usuario/:idUsuario" element={<PerfilUsuario />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
