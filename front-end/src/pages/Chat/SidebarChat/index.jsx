import "./style.css";
import jwt from 'jwt-decode';
import apiRequest from "../../../services/api.js";
import GroupsIcon from '@mui/icons-material/Groups';
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import isAuthenticated from "../../../isAuth";
import PersonIcon from "@mui/icons-material/Person";



export default function SidebarChat() {
  const [usuario, setUsuario] = useState({});
  const [token, setToken] = useState('');
  const [chats, setChats] = useState([])
  const [fotosUsuarios, setFotoUsuarios] = useState({})


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
    if (token && usuario) {
      getUsuario()
      getFotos()
    }
  }, [token])

  useEffect(() => {
    if (usuario && token) {
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
            {chat.privado && (
              <div className="sidebarItemChat">
                {chat.privado && (
                  <>
                    {chat.usuarios[0].user.id === jwt(token).secret.id ? (
                      chat.usuarios[0].userTarget.id in fotosUsuarios ? (
                        <img
                          id="imagemPerfilChatS"
                          src={fotosUsuarios[chat.usuarios[0].userTarget.id]}
                          alt="imagemPerfil"
                        />
                      ) : (
                        <PersonIcon/>
                      )
                    ) : (
                      chat.usuarios[0].user.id in fotosUsuarios ? (
                        <img
                          id="imagemPerfilChatS"
                          src={fotosUsuarios[chat.usuarios[0].user.id]}
                          alt="imagemPerfil"
                        />
                      ) : (
                        <PersonIcon/>
                      )
                    )}
                  </>
                )}
                {chat.usuarios[0].user.id === jwt(token).secret.id
                  ? chat.usuarios[0].userTarget.nome
                  : chat.usuarios[0].user.nome}
              </div>
            )}


            {!chat.privado && <div className="sidebarItemChat"><div className="iconeSala">{<GroupsIcon style={{ fontSize: '40px' }}/>}</div>{
            chat.nome}</div>}
          </Link>
        );
      })}

    </div>
  );
}