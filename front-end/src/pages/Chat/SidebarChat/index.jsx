import "./style.css";
import jwt from 'jwt-decode';
import apiRequest from "../../../services/api.js";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import isAuthenticated from "../../../isAuth";
import { SocketContext } from "../../../context/Socket";
import React from "react";

export default function SidebarChat() {
  const [usuario, setUsuario] = useState({});
  const [token, setToken] = useState('');
  const [chats, setChats] = useState([])
  const [fotosUsuarios, setFotoUsuarios] = useState({})
  const socket = useContext(SocketContext);


  useEffect(() => {
    setToken(document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
  }, [])

  const getUsuario = async () => {
    const idUsuario = jwt(token).secret.id
    await apiRequest
      .get(`/usuario/${idUsuario}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setUsuario(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  const getFotos = async () => {
    await apiRequest
      .get('/usuario', {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
      const objectData = {}
          response.data.map(e => {
              objectData[`${e._id}`] = e.foto
          })
      setFotoUsuarios(objectData)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  useEffect(() => {
    if(token && usuario){
      getUsuario()
      getFotos()
    }
  }, [token])

  useEffect(() => {
    if(usuario && token){
      apiRequest
        .post("/chat", { chats: usuario.chats }, {
          headers: {
            Authorization: "Bearer " + token,
          }
        })
          .then(response => {
            setChats(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    }
  }, [usuario])

  const limparNotificacao = (idChat) => {
    const idUser = usuario._id
    socket.emit("limparNotificacao", ({idChat: idChat, idUser: idUser}))
    getUsuario()
  }


  return token && usuario && chats && (
    <div className="containerSidebar">
      {chats.map((chat, index) => {
          return (
            <Link
              to={ // quando clicar levar pra pergunta específica
                isAuthenticated()
                  ? `/chat/${chat._id}`
                  : "/login"
              }
              key={index}
              onClick={() => {
                let verificaNotificacao = (chat.usuarios[0].user.id == jwt(token).secret.id ? 
                chat.usuarios[0].user.notificacoes : 
                chat.usuarios[0].userTarget.notificacoes)
                if(verificaNotificacao){
                  limparNotificacao(chat._id)
                }
              }}
            >
            {chat.privado && <div className="sidebarItem">
              <img id="imagemPerfilChat" 
                src={chat.usuarios[0].user.id == jwt(token).secret.id ? 
                fotosUsuarios[`${chat.usuarios[0].userTarget.id}`] : 
                fotosUsuarios[`${chat.usuarios[0].user.id}`]} 
              alt="imagemPerfil" />
              {chat.usuarios[0].user.id == jwt(token).secret.id ? 
                chat.usuarios[0].userTarget.nome : 
                chat.usuarios[0].user.nome}
                <div>
                  {chat.usuarios[0].user.id == jwt(token).secret.id ? 
                  chat.usuarios[0].user.notificacoes : 
                  chat.usuarios[0].userTarget.notificacoes}
                </div>
            </div>}
            {!chat.privado && <div className="sidebarItem">{chat.nome}</div>}
            </Link>
          );
        })}
    </div>
  );
}
