import "./style.css";

import handleCurso from "../../../services/curso";
import apiRequest from "../../../services/api";
import SidebarContext from "../../../context/SidebarProvider";

import { useContext, useEffect, useState } from "react";

import StarIcon from "@mui/icons-material/Star";

import { Link } from "react-router-dom";

export default function ForumBody({ materiaPesquisada }) {
  const [arrayPerguntas, setArrayPerguntas] = useState([]);
  const { elementoSidebar } = useContext(SidebarContext);

  function getPerguntas() {
    return elementoSidebar == 0
      ? "perguntas"
      : `perguntas/curso/${elementoSidebar}`;
  }

  useEffect(() => {
    apiRequest
      .get(getPerguntas())
      .then((response) => {
        setArrayPerguntas(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [elementoSidebar]);

  const perguntasFiltradas = arrayPerguntas.filter(
    (e) =>
      e.filtro
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .startsWith(
          materiaPesquisada
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
        ) ||
      // eslint-disable-next-line eqeqeq
      e.filtro
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase() ==
        materiaPesquisada
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
  );

  return (
    <div className="container-pergunta">
      <div className="criar-pergunta">
        <Link to="/criar-pergunta">
          <button>FAÇA UMA PERGUNTA</button>
        </Link>
      </div>
      {perguntasFiltradas.map((pergunta, index) => {
        return (
          <Link to={`/pergunta/${pergunta.id}`} key={index}>
            <div className="card-pergunta">
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
          </Link>
        );
      })}
    </div>
  );
}
