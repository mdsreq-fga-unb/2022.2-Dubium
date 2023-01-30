import "./style.css";

import handleCurso from "../../services/curso";
import apiRequest from "../../services/api";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";



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

  const deletarUsuario = async () => {
    await apiRequest
      .delete(`usuarios/${idUsuario}`)
      .then(() => {
        alert("Conta deletada com sucesso!");
      })
      .catch((error) => console.log(error));

    navigate(-1);
  };

  const updateFavotito = async () => {
    await apiRequest
      .patch(favorito ? `usuarios/menos/${idUsuario}` : `usuarios/${idUsuario}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <ul className="ranking-usuario">
      <li className="usuario-ranqueado" style={{ width: "100%" }}>
      <PersonIcon fontSize="large" />
        <span>{usuarioSelecionado.nome_completo}</span>
        <span>{handleCurso(usuarioSelecionado.curso)}</span>
        <span>{usuarioSelecionado.celular}</span>
        <span>{usuarioSelecionado.email}</span>
        <IconButton onClick={deletarUsuario}>
          <DeleteIcon sx={{ fontSize: 16 }} />
        </IconButton>
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
