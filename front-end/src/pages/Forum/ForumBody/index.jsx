import "./style.css";

import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import StarIcon from "@mui/icons-material/Star";

export default function ForumBody(props) {
  return (
    <div className="container-pergunta">
      <div className="criar-pergunta">
        <button onClick={() => props.setIsFormOpen(true)}>
          FAÇA UMA PERGUNTA
        </button>
      </div>
      {props.perguntas.map((pergunta, index) => {
        return (
          <div className="card-pergunta" key={index}>
            <div className="usuario-pergunta">
              <div className="avatar">
                <img
                  src={pergunta.userPergunta.foto}
                  alt=""
                  className="picture"
                />
              </div>
              <div className="usuario-informacao-texto">
                <span>{pergunta.userPergunta.nome}</span>
                <span>{pergunta.userPergunta.curso}</span>
              </div>
            </div>
            <div>{pergunta.textoPergunta}</div>
            <ul className="container-interacao">
              <li className="item-interacao">
                <StarIcon />
                <span>Favoritar</span>
              </li>
              <li className="item-interacao">
                <QuestionAnswerIcon />
                <span>Responder</span>
              </li>
            </ul>
            {pergunta.respostas.length != 0 && (
              <div className="card-resposta">
                <div className="avatar">
                  <img
                    src={pergunta.respostas[0].userResposta.foto}
                    alt=""
                    className="picture"
                  />
                </div>
                <div className="resposta-info">
                  <div>{pergunta.respostas[0].userResposta.nome}</div>
                  <div>{pergunta.respostas[0].userResposta.curso}</div>
                  <div className="texto-resposta">
                    {pergunta.respostas[0].textoResposta}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
