import "./style.css";

import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import apiRequest from "../../services/api";

export default function (props) {
  const [usuario, setUsuario] = useState({});
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    apiRequest
      .get(`usuarios/${props.idUsuario}`)
      .then((response) => {
        setUsuario(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  function updateFavotito() {
    apiRequest
      .patch(
        favorito ? `usuarios/menos/${usuario.id}` : `usuarios/${usuario.id}`
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
    <ul className="ranking-usuario">
      <li className="usuario-ranqueado">
        <span>{usuario.nome_completo}</span>
        <span>{handleCurso(usuario.curso)}</span>
        <div
          className="item-interacao"
          onClick={() => {
            updateFavotito();
            setFavorito(!favorito);
          }}
        >
          <IconButton>
            <StarIcon className={favorito ? "corFavorito" : ""} />
          </IconButton>
          <span>Favoritar</span>
        </div>
      </li>
    </ul>
  );
}
