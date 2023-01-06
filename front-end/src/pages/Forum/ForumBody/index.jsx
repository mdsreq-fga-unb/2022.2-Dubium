import "./style.css";

import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import apiRequest from "../../../services/api";
import { Link } from "react-router-dom";

export default function ForumBody(props) {

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
    <div className="container-pergunta">
      <div className="criar-pergunta">
        <button onClick={() => props.setIsFormOpen(true)}>
          FAÇA UMA PERGUNTA
        </button>
      </div>
      <div className="criar-pergunta">
        
          <button onClick={() => props.setIsRankingOpen(true)}>
            RANKING GERAL DE USUÁRIOS
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
                <span>{pergunta.usuario.nome_completo}</span>
                <span>{handleCurso(pergunta.usuario.curso)}</span>
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
