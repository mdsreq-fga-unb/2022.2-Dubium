import AvisosSalvos from "./AvisosSalvos";
import PerguntasSalvas from "./PerguntasSalvas";
import "./style.css";

export default function Salvos() {
  return (
    <div className="container pgs-container">
      <PerguntasSalvas />
      <AvisosSalvos />
    </div>
  );
}
