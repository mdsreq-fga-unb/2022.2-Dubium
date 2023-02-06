import "./App.css";

import PerguntaSelecionada from "./pages/Forum/PerguntaSelecionada";
import FormularioPergunta from "./pages/Forum/FormularioPergunta";
import AvisosFormulario from "./pages/Avisos/AvisosFormulario";
import AvisoSelecionado from "./pages/Avisos/AvisoSelecionado";
import AvisosConteudo from "./pages/Avisos/AvisosConteudo";
import CadastrarUsuarios from "./pages/CadastrarUsuarios";
import RankingUsuarios from "./pages/RankingUsuarios";
import EditarUsuario from "./pages/EditarUsuarios";
import PerfilUsuario from "./pages/PerfilUsuario";
import ForumBody from "./pages/Forum/ForumBody";
import Footer from "./components/footer";
import Salvos from "./pages/Salvos";
import Sobre from "./pages/Sobre";
import Login from "./pages/login";

import ForumLayout from "./pages/Forum/ForumLayout";
import AuthLayout from "./components/AuthLayout";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [logado, setLogado] = useState(false);
  const [materiaPesquisada, setMateriaPesquisada] = useState("");

  return (
    <Router>
      <Routes>
        <Route
          element={<AuthLayout setMateriaPesquisada={setMateriaPesquisada} />}
        >
          <Route path="/" element={<ForumLayout pagina="forum" />}>
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
              element={<PerguntaSelecionada />}
            />
            <Route path="/criar-pergunta" element={<FormularioPergunta />} />
          </Route>
          <Route path="/avisos" element={<ForumLayout pagina="avisos" />}>
            <Route
              index
              element={<AvisosConteudo materiaPesquisada={materiaPesquisada} />}
            />
            <Route
              path="/avisos/:id"
              element={<AvisosConteudo materiaPesquisada={materiaPesquisada} />}
            />
            <Route
              path="/avisos/aviso/:idAviso"
              element={<AvisoSelecionado />}
            />
            <Route path="/avisos/criar-aviso" element={<AvisosFormulario />} />
          </Route>
          <Route
            path="/ranking-usuarios"
            element={<RankingUsuarios materiaPesquisada={materiaPesquisada} />}
          />
          <Route
            path="/usuario/:idUsuario"
            element={<PerfilUsuario setLogado={setLogado} />}
          />
          <Route path="/salvos" element={<Salvos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route
            path="/editar-usuario/:idUsuario"
            element={<EditarUsuario />}
          />
        </Route>
        <Route path="/cadastrar-usuario" element={<CadastrarUsuarios />} />
        <Route path="/login" element={<Login setLogado={setLogado} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
