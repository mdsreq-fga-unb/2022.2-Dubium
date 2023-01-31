import "./style.css";

import handleCurso from "../../services/curso";
import apiRequest from "../../services/api";

import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PerfilUsuario() {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
  const [favorito, setFavorito] = useState(false);

  const { idUsuario } = useParams();

  const navigate = useNavigate();

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
    <div className="perfil-usuario">
      <div className="pu-perfil">
        <PersonIcon sx={{ fontSize: 100 }} />
        <div className="pu-perfil-texto">
          <span>{usuarioSelecionado.nome_completo}</span>
          <span style={{ color: "#757575" }}>
            {handleCurso(usuarioSelecionado.curso)}
          </span>
        </div>
      </div>
      <ul className="pu-informacoes">
        <span style={{ fontSize: "18px" }}>INFORMAÇÕES DE CONTATO</span>
        <li className="pu-item-informacao">
          <span>E-mail:</span>
          <span style={{ color: "#757575" }}>{usuarioSelecionado.email}</span>
        </li>
        <li className="pu-item-informacao">
          <span>Telefone:</span>
          <span style={{ color: "#757575" }}>{usuarioSelecionado.celular}</span>
        </li>
      </ul>
      <ul className="pu-interecoes">
        <li
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
        </li>
        <li>
          <button className="pu-excluir">
            <DeleteIcon sx={{ fontSize: 16 }} />
            EXCLUIR CONTA
          </button>
        </li>
      </ul>
    </div>
  );
}
