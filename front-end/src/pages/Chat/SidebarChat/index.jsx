import "./style.css";
import jwt from 'jwt-decode';
import apiRequest from "../../../services/api.js";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import isAuthenticated from "../../../isAuth";


export default function SidebarChat() {
  const [usuario, setUsuario] = useState({});
  const [token, setToken] = useState('');
  const [chats, setChats] = useState([])
  

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

  useEffect(() => {
    if(token && usuario){
      getUsuario()
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

  // useEffect(() => {
  //   if(usuario && chats && token){
  //     console.log(chats)
  //   }
  // }, [chats])

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
            >
            {chat.privado && <div className="sidebarItem">{chat.usuarios[0].user.id == jwt(token).secret.id ? chat.usuarios[0].userTarget.nome : chat.usuarios[0].user.nome}</div>}
            </Link>
          );
        })}

    </div>
  );
}
