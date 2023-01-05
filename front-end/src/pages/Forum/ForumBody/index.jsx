import "./style.css";

import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import apiRequest from "../../../services/api";
import { Link } from "react-router-dom";

export default function ForumBody(props) {
  return (
    <div className="container-pergunta">
      <div className="criar-pergunta">
        <button onClick={() => props.setIsFormOpen(true)}>
          FAÇA UMA PERGUNTA
        </button>
      </div>
      <div className="criar-pergunta">
        <Link to="/ranking-usuarios">
          <button>
            RANKING GERAL DE USUÁRIOS
          </button>
        </Link>
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
                <span>{pergunta.usuario.curso}</span>
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
