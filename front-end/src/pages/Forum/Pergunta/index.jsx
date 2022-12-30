import "./style.css";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import StarIcon from "@mui/icons-material/Star";

export default function Pergunta(props) {
  return (
    <div className="card-pergunta unica-pergunta">
      <div className="usuario-informacao-texto">
        <span>{props.pergunta.userPergunta.nome}</span>
        <span>{props.pergunta.userPergunta.curso}</span>
      </div>
      <span>{props.pergunta.textoPergunta}</span>
      <div className="like-comentario">
        <span>Pedro santos e mais 19 pessoas</span>
        <span>1 comentário</span>
      </div>
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
      <textarea
        name=""
        id=""
        cols="30"
        rows="2"
        placeholder="Comentar"
        className="comentar"
      ></textarea>
      {props.pergunta.respostas.map((resposta, index) => {
        return (
          <div className="resposta">
            <div className="usuario-informacao-texto">
              <span>{resposta.userResposta.nome}</span>
              <span>{resposta.userResposta.curso}</span>
            </div>
            <div>{resposta.textoResposta}</div>
            <ul className="container-resposta-interacao">
              <li className="item-interacao">
                <StarIcon />
                <span>Favoritar</span>
              </li>
              <li className="item-interacao">
                <QuestionAnswerIcon />
                <span
                  onClick={() => {
                    props.setIsPerguntaOpen(true);
                    props.setIndexPergunta(index);
                  }}
                >
                  Responder
                </span>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
