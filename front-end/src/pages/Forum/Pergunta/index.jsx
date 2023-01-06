import "./style.css";
import { useState } from "react";

import apiRequest from "../../../services/api";

import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export default function Pergunta(props) {
  const [favorito, setFavorito] = useState(false);
  const [comentar, setComentar] = useState(false);

  function deletePergunta() {
    apiRequest.delete(`perguntas/${props.perguntaSelecionada.id}`).then(() => {
      alert("Post deleted!");
    });
    props.setIsPerguntaOpen(false);
  }

  function updateFavotito() {
    apiRequest
      .patch(
        favorito
          ? `perguntas/menos/${props.perguntaSelecionada.id}`
          : `perguntas/${props.perguntaSelecionada.id}`
      )
      .then((response) => {});
  }

  function handleCurso(curso) {
    let nomeCurso;

    switch (curso) {
      case 1:
        nomeCurso = "Engenharias";
        break;
      case 2:
        nomeCurso = "Engenharia Aeroespacial";
        break;
      case 3:
        nomeCurso = "Engenharia Automotiva";
        break;
      case 4:
        nomeCurso = "Engenharia Eletrônica";
        break;
      case 5:
        nomeCurso = "Engenharia de Energia";
        break;
      case 6:
        nomeCurso = "Engenharia Software";
        break;

      default:
        break;
    }

    return nomeCurso;
  }

  return (
    <div className="card-pergunta pergunta-selecionada">
      <div className="usuario-informacao-texto">
        <div className="delete">
          <span>{props.perguntaSelecionada.usuario.nome_completo}</span>
          <IconButton style={{ width: "20" }} onClick={deletePergunta}>
            <DeleteIcon />
          </IconButton>
        </div>
        <span>{handleCurso(props.perguntaSelecionada.usuario.curso)}</span>
      </div>
      <span>{props.perguntaSelecionada.corpoPergunta}</span>
      {/* <div className="like-comentario">
        <StarIcon />
        <span>{props.perguntaSelecionada.votosTotais} favoritos</span>
      </div> */}
      <ul className="container-interacao">
        <li
          className="item-interacao"
          onClick={() => {
            setFavorito(!favorito);
            updateFavotito();
          }}
        >
          <IconButton>
            <StarIcon className={favorito ? "corFavorito" : ""} />
          </IconButton>
          <span>Favoritar</span>
        </li>
        <li className="item-interacao" onClick={() => setComentar(!comentar)}>
          <IconButton>
            <QuestionAnswerIcon />
          </IconButton>
          <span>Responder</span>
        </li>
      </ul>
      {comentar && (
        <textarea
          name=""
          id=""
          cols="30"
          rows="2"
          placeholder="Comentar"
          className="comentar"
        ></textarea>
      )}
      {/* {props.pergunta.respostas.map((resposta, index) => {
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
      })} */}
    </div>
  );
}
