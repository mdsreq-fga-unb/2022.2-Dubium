import { useEffect, useState } from "react";
import ForumBody from "./ForumBody";
import { dadosPergunta } from "./data.js";
import "./style.css";
import Sidebar from "./Sidebar";
import FormularioPergunta from "./FormularioPergunta";
import Pergunta from "./Pergunta";
import apiRequest from "../../services/api";

export default function Forum() {
  const [arrayPerguntas, setArrayPerguntas] = useState(dadosPergunta);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPerguntaOpen, setIsPerguntaOpen] = useState(false);
  const [indexPergunta, setIndexPergunta] = useState();


  useEffect(() => {
    apiRequest
    .get("perguntas")
    .then((response) => {
      setArrayPerguntas(response.data)
    }).catch((err) => {
      console.log("Ops")
    });
  }, [])

  const handleComponent = () => {
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
          pergunta={dadosPergunta[indexPergunta]}
          setIndexPergunta={setIndexPergunta}
        />
      );
    } else {
      return (
        <ForumBody
          perguntas={arrayPerguntas}
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
