import "./style.css";

import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import apiRequest from "../../services/api";
import handleCurso from "../../services/curso";

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

  return (
    <ul className="ranking-usuario">
      <li className="usuario-ranqueado">
        <span>{usuario.fotoPerfil}</span>
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
