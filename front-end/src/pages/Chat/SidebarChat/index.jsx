import "./style.css";
import jwt from 'jwt-decode';
import apiRequest from "../../../services/api.js";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";


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
              key={index}
            >
            <div className="sidebarItem">{chat._id}</div>
            </Link>
          );
        })}

    </div>
  );
}
