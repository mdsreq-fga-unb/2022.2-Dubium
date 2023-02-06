import "./style.css";

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SidebarContext from "../../../context/SidebarProvider";
import pesquisaPosts from "../../../services/pesquisa";
import apiRequest from "../../../services/api";
import handleCurso from "../../../services/curso";

import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";

export default function AvisosConteudo({ materiaPesquisada }) {
  const [arrayAvisos, setArrayAvisos] = useState([]);
  const { elementoSidebar } = useContext(SidebarContext);

  function getAvisos() {
    return elementoSidebar == 0 ? "avisos" : `avisos/curso/${elementoSidebar}`;
  }

  useEffect(() => {
    apiRequest
      .get(getAvisos(), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setArrayAvisos(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [elementoSidebar]);

  const avisosFiltrados = pesquisaPosts(arrayAvisos, materiaPesquisada);

  return (
    <div className="container">
      <div className="container-pergunta">
        <div className="criar-pergunta">
          <Link to="/avisos/criar-aviso">
            <button>CRIAR AVISO</button>
          </Link>
        </div>
        {avisosFiltrados.map((aviso, index) => {
          return (
            <Link to={`/avisos/aviso/${aviso.id}`} key={index}>
              <div className="card-pergunta">
                <div className="usuario-pergunta">
                  <PersonIcon fontSize="large" />
                  <div className="usuario-informacao-texto">
                    <span>{aviso.usuario.fotoPerfil}</span>
                    <span>{aviso.usuario.nome_completo}</span>
                    <span style={{ color: "#757575" }}>
                      {handleCurso(aviso.usuario.curso)}
                    </span>
                  </div>
                </div>
                <span className="filtro">{aviso.filtro.toUpperCase()}</span>
                <span>{aviso.tituloAviso}</span>
                <span>{aviso.corpoAviso}</span>
                <div className="like-comentario">
                  <StarIcon sx={{ color: "#ffa722", fontSize: 16 }} />
                  <span>{aviso.votosTotais} favoritos</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
