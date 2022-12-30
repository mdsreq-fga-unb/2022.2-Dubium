import { useState } from "react";
import ForumBody from "./ForumBody";
import { dadosPergunta } from "./data.js";
import "./style.css";
import Sidebar from "./Sidebar";
import FormularioPergunta from "./FormularioPergunta";
import Pergunta from "./Pergunta";

export default function Forum() {
  const [arrayPerguntas, setArrayPerguntas] = useState(dadosPergunta);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isPerguntaOpen, setIsPerguntaOpen] = useState(false);
  const [indexPergunta, setIndexPergunta] = useState();

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
      return <Pergunta pergunta={dadosPergunta[indexPergunta]} />;
    } else {
      return (
        <ForumBody
          perguntas={arrayPerguntas}
          setIsFormOpen={setIsFormOpen}
          setIsPerguntaOpen={setIsPerguntaOpen}
          setPergunta={setIndexPergunta}
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
