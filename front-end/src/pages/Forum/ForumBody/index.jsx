import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function ForumBody(props) {
  return (
    <div className="container-pergunta">
      <div className="criar-pergunta">
        <Link to="/formulario-pergunta">FAÇA UMA PERGUNTA</Link>
      </div>
      {props.perguntas.map((pergunta, index) => {
        return (
          <div className="container-card">
            <div>
              <img
                src={pergunta.user.foto}
                alt=""
                className="user-pergunta-foto"
              />
              <span className="user-name">{pergunta.user.nome}</span>
            </div>
            <div className="pergunta">{pergunta.pergunta}</div>
            <div className="teste">
              <button>Responder</button>
              <button>Avaliar</button>
            </div>
            <div className="resposta">
              <img
                src={pergunta.respostas[0].user.foto}
                alt=""
                className="user-pergunta-foto"
              />
              <span>{pergunta.respostas[0].resposta}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
