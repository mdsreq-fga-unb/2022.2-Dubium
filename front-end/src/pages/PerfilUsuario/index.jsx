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
import jwt from 'jwt-decode';
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

import PerguntasCadastradas from "./PerguntasCadastradas";

export default function PerfilUsuario({ setLogado }) {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
  const [favorito, setFavorito] = useState(false);
  const [token, setToken] = useState('');


  const { idUsuario } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setToken(document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
  }, [])

  const addChatInstance = async () => {
    let verify = false
    const data = {
      user: {
        id: jwt(token).secret.id,
        nome: jwt(token).secret.nome
      },
      userTarget: {
        id: usuarioSelecionado._id,
        nome: usuarioSelecionado.nome_completo
      },
      privado: true
    }

    usuarioSelecionado.chats.forEach(e => {
      if(e.usuarios.includes(data.user) && e.privado){
        return verify = true
      }
    })

    if(!verify){
      await apiRequest
        .post("/usuario/chatInstance", data, {
          headers: {
            Authorization: "Bearer " + token
          },
        })
        .then(response => {
          console.log("Instância criada com sucesso")
        })
        .catch(err => {
          console.log({error: "Erro ao fazer requisição"})
        })
    }
  }

  const getUsuario = () => {
    apiRequest
      .get(`/usuario/${idUsuario}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUsuarioSelecionado(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  useEffect(() => {
    if (token && usuarioSelecionado) {
      getUsuario()
    }
  }, [token]);

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
          onClick: () => { },
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

  return usuarioSelecionado && (
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
        {token && jwt(token).secret.id == idUsuario && (
          <Link to="/salvos">
            <button className="button-salvos">PERGUNTAS E AVISOS SALVOS</button>
          </Link>
        )}
        <ul className="pu-informacoes">
          <span style={{ fontSize: "18px" }}>INFORMAÇÕES DE CONTATO</span>
          <li className="pu-item-informacao">
            <span>E-mail:</span>
            <span style={{ color: "#ffffff" }}>{usuarioSelecionado?.email}</span>
          </li>
          <li className="pu-item-informacao">
            <span>Telefone:</span>
            <span style={{ color: "#ffffff" }}>
              {usuarioSelecionado?.celular}
            </span>
          </li>
        </ul>
        {/* favoritos e salvos */}
        <ul className="pu-interecoes">
          {token && jwt(token).secret.id != idUsuario && (<li
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
          </li>)}
          {/* editar usuario */}
          {token && idUsuario == jwt(token).secret.id && (
            <div className="pu-opcoes">
              <Link to={`/editar-usuario/${jwt(token).secret.id}`}>
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


          {token && idUsuario != jwt(token).secret.id && (
            <div className="buttonChat">
              <Link to={`/chat/${jwt(token).secret.id}`}
              onClick={() => {
                addChatInstance()
              }}
              >
                Mensagem
              </Link>
            </div>
          )}

        </ul>
      </div>
      <PerguntasCadastradas idUsuario={idUsuario} />
    </div>
  );
}
