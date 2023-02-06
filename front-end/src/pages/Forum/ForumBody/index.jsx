import "./style.css";

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SidebarContext from "../../../context/SidebarProvider";
import pesquisaPosts from "../../../services/pesquisa";
import handleCurso from "../../../services/curso";
import apiRequest from "../../../services/api";

import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";

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
      .get(getPerguntas(), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setArrayPerguntas(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [elementoSidebar]);

  const perguntasFiltradas = pesquisaPosts(arrayPerguntas, materiaPesquisada);

  return (
    <div className="container">
      <div className="container-pergunta">
        <div className="criar-pergunta">
          <Link
            to={localStorage.getItem("userId") ? "/criar-pergunta" : "/login"}
          >
            <button>FAÇA UMA PERGUNTA</button>
          </Link>
        </div>
        {perguntasFiltradas.map((pergunta, index) => {
          return (
            <Link to={`/pergunta/${pergunta.id}`} key={index}>
              <div className="card-pergunta">
                <div className="usuario-pergunta">
                  <PersonIcon fontSize="large" />
                  <div className="usuario-informacao-texto">
                    <span>{pergunta.usuario.nome_completo}</span>
                    <span style={{ color: "#757575" }}>
                      {handleCurso(pergunta.usuario.curso)}
                    </span>
                  </div>
                </div>
                <span className="filtro">{pergunta.filtro.toUpperCase()}</span>
                <span>{pergunta.tituloPergunta}</span>
                <span>{pergunta.corpoPergunta}</span>
                <div className="like-comentario">
                  <StarIcon sx={{ color: "#ffa722", fontSize: 16 }} />
                  <span>{pergunta.votosTotais} favoritos</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
