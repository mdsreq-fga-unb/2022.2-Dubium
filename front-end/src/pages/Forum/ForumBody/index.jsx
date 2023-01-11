import "./style.css";

import handleCurso from "../../../services/curso";

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
          <div
            className="card-pergunta"
            key={index}
            onClick={() => {
              props.setIndexPergunta(index);
              props.setIsPerguntaOpen(true);
            }}
          >
            <div className="usuario-pergunta">
              {/* <div className="avatar">
                <img
                  src={pergunta.userPergunta.foto}
                  alt=""
                  className="picture"
                />
              </div> */}
              <div className="usuario-informacao-texto">
                <span>{pergunta.usuario.fotoPerfil}</span>
                <span>{pergunta.usuario.nome_completo}</span>
                <span>{handleCurso(pergunta.usuario.curso)}</span>
              </div>
            </div>
            <div>{pergunta.tituloPergunta}</div>
            <div>{pergunta.corpoPergunta}</div>
            <div className="like-comentario">
              <StarIcon style={{ color: "#ffa722" }} />
              <span>{pergunta.votosTotais} favoritos</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
