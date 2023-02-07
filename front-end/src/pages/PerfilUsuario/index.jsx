import "./style.css";

import handleCurso from "../../services/curso";
import apiRequest from "../../services/api";

import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import StarIcon from "@mui/icons-material/Star";
import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

import PerguntasCadastradas from "./PerguntasCadastradas";

export default function PerfilUsuario({ setLogado }) {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
  const [favorito, setFavorito] = useState(false);
  

  const { idUsuario } = useParams();

  const navigate = useNavigate();


  useEffect(() => {
    apiRequest
      .get(`usuarios/${idUsuario}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUsuarioSelecionado(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [idUsuario]);

  const deletarUsuario = async () => {
    if (confirm("Tem certeza que deseja excluir sua conta?")) {
      await apiRequest
        .delete(`usuarios/${idUsuario}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          alert("Conta deletada com sucesso!");
        })
        .catch((error) => console.log(error));

      localStorage.clear();
      navigate("/");
      setLogado(false);
    }
  };

  const handleDelete = () => {
    confirmAlert({
      title: "Excluir conta",
      message: "Você tem certeza que deseja excluir sua conta?",
      buttons: [
        {
          label: "Sim",
          onClick: () => deletarUsuario(),
        },
        {
          label: "Não",
          onClick: () => {},
        },
      ],
    });
  };

  const updateFavotito = async () => {
    await apiRequest
      .patch(favorito ? `usuarios/menos/${idUsuario}` : `usuarios/${idUsuario}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container pu-container">
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
        {localStorage.getItem("userId") == idUsuario && (
          <Link to="/salvos">
            <button className="button-salvos">PERGUNTAS E AVISOS SALVOS</button>
          </Link>
        )}
        <ul className="pu-informacoes">
          <span style={{ fontSize: "18px" }}>INFORMAÇÕES DE CONTATO</span>
          <li className="pu-item-informacao">
            <span>E-mail:</span>
            <span style={{ color: "#757575" }}>{usuarioSelecionado.email}</span>
          </li>
          <li className="pu-item-informacao">
            <span>Telefone:</span>
            <span style={{ color: "#757575" }}>
              {usuarioSelecionado.celular}
            </span>
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
          {idUsuario == localStorage.getItem("userId") && (
            <div className="pu-opcoes">
              <Link to={`/editar-usuario/${localStorage.getItem("userId")}`}>
                <li>
                  <button className="pu-editar">
                    <EditIcon sx={{ fontSize: 16 }} />
                    EDITAR CONTA
                  </button>
                </li>
              </Link>

              <li>
                <button className="pu-excluir" onClick={deletarUsuario}>
                  <DeleteIcon sx={{ fontSize: 16 }} />
                  EXCLUIR CONTA
                </button>
              </li>
            </div>
          )}
        </ul>
      </div>
      <PerguntasCadastradas idUsuario={idUsuario} />
    </div>
  );
}
