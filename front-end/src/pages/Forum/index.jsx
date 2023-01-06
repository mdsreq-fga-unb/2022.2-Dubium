import { useEffect, useState } from "react";
import ForumBody from "./ForumBody";
import { dadosPergunta } from "./data.js";
import "./style.css";
import Sidebar from "./Sidebar";
import FormularioPergunta from "./FormularioPergunta";
import Pergunta from "./Pergunta";
import apiRequest from "../../services/api";
import { useContext } from "react";
import SidebarContext from "../../context/SidebarProvider";
import RankingUsuarios from '../../components/RankingUsuarios'
import PerfilUsuario from '../../components/PerfilUsuario'

export default function Forum() {
  const [arrayPerguntas, setArrayPerguntas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPerguntaOpen, setIsPerguntaOpen] = useState(false);
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [isUsuarioOpen, setIsUsuarioOpen] = useState(false);
  const [indexPergunta, setIndexPergunta] = useState();
  const [indexUsuario, setIndexUsuario] = useState();
  
  const { elementoSidebar } = useContext(SidebarContext);

  function getPerguntas() {
    return elementoSidebar == 0
      ? "perguntas"
      : `perguntas/curso/${elementoSidebar}`;
  }

  useEffect(() => {
    apiRequest
      .get(getPerguntas())
      .then((response) => {
        setArrayPerguntas(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [elementoSidebar, isFormOpen, isPerguntaOpen]);

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

  const handleComponent = () => {
    console.log(isUsuarioOpen);
    if (isFormOpen) {
      return (
        <FormularioPergunta
          setIsFormOpen={setIsFormOpen}
          perguntas={arrayPerguntas}
          setPerguntas={setIndexPergunta}
        />
      );
    } else if (isPerguntaOpen) {
      return (
        <Pergunta
          perguntaSelecionada={arrayPerguntas[indexPergunta]}
          setIndexPergunta={setIndexPergunta}
          setIsPerguntaOpen={setIsPerguntaOpen}
        />
      );
    }
    else if(isRankingOpen){
      return (
        <RankingUsuarios usuarios={usuarios} setIndexUsuario={setIndexUsuario} setIsUsuarioOpen={setIsUsuarioOpen} setIsRankingOpen={setIsRankingOpen}/>
      );
    }
    else if(isUsuarioOpen) {
      return(
        <PerfilUsuario usuarioSelecionado={usuarios[indexUsuario]}/>
      );
    }
    else {
      return (
        <ForumBody
          perguntas={arrayPerguntas}
          setIsFormOpen={setIsFormOpen}
          setIsPerguntaOpen={setIsPerguntaOpen}
          setIndexPergunta={setIndexPergunta}
          setIsRankingOpen={setIsRankingOpen}
        />
      );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar
        setIsFormOpen={setIsFormOpen}
        setIsPerguntaOpen={setIsPerguntaOpen}
        setIsRankingOpen={setIsRankingOpen}
        setIsUsuarioOpen={setIsUsuarioOpen}
      />
      <div className="container-forum">{handleComponent()}</div>
    </div>
  );
}
