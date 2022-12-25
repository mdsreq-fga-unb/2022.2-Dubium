import { useState } from "react";
import ForumBody from "./ForumBody";
import { dadosPergunta } from "./data.js";
import "./style.css";
import Sidebar from "./Sidebar";
import FormularioPergunta from "./FormularioPergunta";

export default function Forum() {
  const [perguntas, setPerguntas] = useState(dadosPergunta);
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <div className="container-forum">
        {isFormOpen ? (
          <FormularioPergunta
            setIsFormOpen={setIsFormOpen}
            perguntas={perguntas}
            setPerguntas={setPerguntas}
          />
        ) : (
          <ForumBody perguntas={perguntas} setIsFormOpen={setIsFormOpen} />
        )}
      </div>
    </div>
  );
}
