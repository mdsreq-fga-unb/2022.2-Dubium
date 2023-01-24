import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarContext from "../../../context/SidebarProvider";
import apiRequest from "../../../services/api";
import handleCurso from "../../../services/curso";
import StarIcon from "@mui/icons-material/Star";
import "./style.css";

export default function AvisosConteudo({ materiaPesquisada }) {
  const [arrayAvisos, setArrayAvisos] = useState([]);
  const { elementoSidebar } = useContext(SidebarContext);

  function getAvisos() {
    return elementoSidebar == 0 ? "avisos" : `avisos/curso/${elementoSidebar}`;
  }

  useEffect(() => {
    apiRequest
      .get(getAvisos())
      .then((response) => {
        setArrayAvisos(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [elementoSidebar]);

  const avisosFiltrados = arrayAvisos.filter(
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
          <button>CRIAR AVISO</button>
        </Link>
      </div>
      {avisosFiltrados.map((aviso, index) => {
        return (
          <Link to={`/pergunta/`} key={index}>
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
                  <span>{aviso.usuario.fotoPerfil}</span>
                  <span>{aviso.usuario.nome_completo}</span>
                  <span>{handleCurso(aviso.usuario.curso)}</span>
                </div>
              </div>
              <div>{aviso.tituloAviso}</div>
              <div>{aviso.corpoAviso}</div>
              <div className="like-comentario">
                <StarIcon style={{ color: "#ffa722" }} />
                <span>{aviso.votosTotais} favoritos</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
