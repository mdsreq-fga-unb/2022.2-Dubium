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
              {/* <div className="avatar">
                <img
                  src={pergunta.userPergunta.foto}
                  alt=""
                  className="picture"
                />
              </div> */}
              <div className="usuario-informacao-texto">
                <span>{pergunta.id_usuario}</span>
                {/* <span>{pergunta.userPergunta.curso}</span> */}
              </div>
            </div>
            <div>{pergunta.tituloPergunta}</div>
            <div>{pergunta.corpoPergunta}</div>
            <div className="like-comentario">
              <StarIcon />
              <span>{pergunta.votosTotais} favoritos</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
