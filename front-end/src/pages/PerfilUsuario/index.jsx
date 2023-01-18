import "./style.css";

import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import apiRequest from "../../services/api";
import handleCurso from "../../services/curso";
import { useParams } from "react-router-dom";

export default function () {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
  const [favorito, setFavorito] = useState(false);

  const { idUsuario } = useParams();

  useEffect(() => {
    apiRequest
      .get(`usuarios/${idUsuario}`)
      .then((response) => {
        setUsuarioSelecionado(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const updateFavotito = async () => {
    await apiRequest
      .patch(favorito ? `usuarios/menos/${idUsuario}` : `usuarios/${idUsuario}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <ul className="ranking-usuario">
      <li className="usuario-ranqueado" style={{ width: "60%" }}>
        <span>{usuarioSelecionado.fotoPerfil}</span>
        <span>{usuarioSelecionado.nome_completo}</span>
        <span>{handleCurso(usuarioSelecionado.curso)}</span>
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
