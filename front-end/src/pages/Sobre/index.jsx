import "./style.css";

import mulher from "../../assets/images/mulher.png";
import bichinho from "../../assets/images/bichinho.png";

export default function Sobre() {
  return (
    <div className="container" style={{ marginLeft: "-301px" }}>
      <div className="sobre">
        <div>
          <img src={mulher} alt="moca" width="150px" />
          <div className="texto">
            <h1> SOBRE O DUBIUM</h1>
            <p />
            <p>
              O Dubium é um sistema web de auxílio acadêmico, que auxilia no
              acesso do esclarecimento de dúvidas dentro de múltiplos conteúdos
              e no agendamento de prestações de ajuda presencial.
            </p>
          </div>
        </div>
        <div>
          <div className="texto">
            <h1>O QUE É O DUBIUM</h1>
            <p />
            <p>
              O Dubium é um produto que visa o auxílio acadêmico aos alunos da
              FGA, focado em ajudá-los / dar suporte para o desenvolvimento
              acadêmico - sanando as dúvidas de estudo - em temas específicos
              das matérias. Gerando assim autonomia e abrangência de
              conhecimentos, sem obrigatoriedade por partes dos estudantes
              voluntários.
            </p>
            <img src={bichinho} alt="bichinho" width="350px" />
          </div>
        </div>
      </div>
    </div>
  );
}
