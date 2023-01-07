import { useEffect, useState } from "react";
import ForumBody from "./ForumBody";
import "./style.css";
import Sidebar from "./Sidebar";
import FormularioPergunta from "./FormularioPergunta";
import Pergunta from "./Pergunta";
import apiRequest from "../../services/api";
import { useContext } from "react";
import SidebarContext from "../../context/SidebarProvider";

export default function Forum(props) {
  const [arrayPerguntas, setArrayPerguntas] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPerguntaOpen, setIsPerguntaOpen] = useState(false);
  const [indexPergunta, setIndexPergunta] = useState();

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

  const perguntasFiltradas = arrayPerguntas.filter(
    (e) =>
      e.filtro
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .startsWith(
          props.materiaPesquisada
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        ) ||
      // eslint-disable-next-line eqeqeq
      e.filtro == props.materiaPesquisada
  );

  const handleComponent = () => {
    if (isFormOpen) {
      return (
        <FormularioPergunta
          setIsFormOpen={setIsFormOpen}
          perguntas={perguntasFiltradas}
          setPerguntas={setIndexPergunta}
        />
      );
    } else if (isPerguntaOpen) {
      return (
        <Pergunta
          perguntaSelecionada={perguntasFiltradas[indexPergunta]}
          setIndexPergunta={setIndexPergunta}
          setIsPerguntaOpen={setIsPerguntaOpen}
        />
      );
    } else {
      return (
        <ForumBody
          perguntas={perguntasFiltradas}
          setIsFormOpen={setIsFormOpen}
          setIsPerguntaOpen={setIsPerguntaOpen}
          setIndexPergunta={setIndexPergunta}
        />
      );
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar
        setIsFormOpen={setIsFormOpen}
        setIsPerguntaOpen={setIsPerguntaOpen}
      />
      <div className="container-forum">{handleComponent()}</div>
    </div>
  );
}
