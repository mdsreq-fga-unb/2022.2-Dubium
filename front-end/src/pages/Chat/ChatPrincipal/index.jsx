import "./style.css";

import SearchIcon from "@mui/icons-material/Search";
import { useRef, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import jwt from 'jwt-decode'
import io from 'socket.io-client';
import apiRequest from '../../../services/api.js'
import { SocketContext } from "../../../context/Socket";
import React, { useContext } from "react";
import SendIcon from "@mui/icons-material/Send";
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';


export default function ChatPrincipal({ setLogado }) {

  const [message, setMessage] = useState("");
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [token, setToken] = useState('');
  const [socket, setSocket] = useState(null);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
  const [chat, setChat] = useState('')
  const { idChat } = useParams();
  const [arrayMensagens, setarrayMensagens] = useState([]);
  const [messagesDB, setMessagesDB] = useState([])
  const [digitando, setDigitando] = useState(false)
  const { idUsuario } = useParams();
  const navigate = useNavigate();
  const conteudoRef = useRef(null);
  const [stringDigitando, setStringDigitando] = useState('')
  const [userTarget, setUserTarget] = useState("")
  const socketContext = useContext(SocketContext);
  const [fotosUsuarios, setFotoUsuarios] = useState({})

  //ScrollBar
  useEffect(() => {
    setToken(document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
    setSocket(socketContext);
  }, [])

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
    if (token) {
      getUsuario()
      getFotos()
    }
  }, [token])

  useEffect(() => {
    return () => {
      if (socket) {
        console.log(usuarioSelecionado)
        socket.emit("leaveInstance");
        console.log("saiu")
      }
    };
  }, [location, socket]);
  

  useEffect(() => {
    if (socket) {
      socket.emit("idUser", jwt(token).secret.id)
      socket.emit('joinInstance', usuarioSelecionado.chats)
      socket.on("receivedMessage", (message) => {
        setarrayMensagens((prevarrayMensagens) => [...prevarrayMensagens, message]);
      });
    }
  }, [usuarioSelecionado]);

  useEffect(() => {
    if(chat){
      socket.on("targetDig", (data) => {
        if(data.idRoom == chat._id){
          setStringDigitando(`${chat.usuarios[0].user.id == jwt(token).secret.id ? 
            chat.usuarios[0].userTarget.nome + " está digitando..." :
            chat.usuarios[0].user.nome + " está digitando..."}`)
        }
      })
      socket.on("targetNaoDig", (data) => {
        setStringDigitando("")
      })
    }
  }, [chat])

  useEffect(() => {
    if(chat && chat.privado) {
      chat.usuarios[0].user.id == usuarioSelecionado._id ? setUserTarget(chat.usuarios[0].userTarget.id) : setUserTarget(chat.usuarios[0].user.id)
    }
  }, [chat])

  const getChat = async () => {
    await apiRequest
      .get(`/chat/${idChat}`, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      .then(data => {
        setChat(data.data)
        setMessagesDB(data.data.mensagens)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const scrollDown = () => {
    const container = document.getElementsByClassName('conteudoChat')[0];
    if (container) {
      console.log(container)
      container.scrollTop = container.scrollHeight
    }
  }

  useEffect(() => {
    if (messagesDB) {
      scrollDown()
    }
  }, [messagesDB]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    if (message.length) {
      var data = {
        user: jwt(token).secret,
        idRoom: idChat
      }
      socket.emit("digitando", data)
    }
    if (!message.length) {
      socket.emit("naoDigitando", idChat)
    }
  }, [message])


  useEffect(() => {
    if (token && idChat) {
      getChat()
    }
  }, [token, idChat]);

  // const enviarNotificacao = (userId, mensagem) => {
  //   socket.emit('enviarNotificacao', { userId, mensagem });
  // };  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mensagemEnviada = message;
    let _message = {
      user: jwt(token).secret,
      message: message,
      horario: new Date(),
      idRoom: idChat,
      idTarget: userTarget,
      privado: chat.privado
    }
    setarrayMensagens((prevarrayMensagens) => [...prevarrayMensagens, _message]);
    socket.emit("sendMessage", _message)
    saveMessages([_message])
    // const userIdDestinatario =  _message.idRoom
    // const mensagemNotificacao = _message.message // mensagem da notificação
    // enviarNotificacao(userIdDestinatario, mensagemNotificacao);
    setMessage("")
  }

  const getUsuario = async () => {
    await apiRequest
      .get(`/usuario/${jwt(token).secret.id}`, {
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

  const saveMessages = async (msg) => {
    await apiRequest
      .post("/chat/messages", { messages: msg, idChat: idChat }, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (arrayMensagens.length >= 1) {
      setMessagesDB([...messagesDB, ...arrayMensagens]);
      setarrayMensagens([])
    }
  }, [arrayMensagens])



  return token && socket && chat && usuarioSelecionado && arrayMensagens && messagesDB &&  (
    <div className="containerChat">
      <div className="chat-principal">

        <div id="corFundo">
          <div className="cabecalhoChat">
            {chat.privado && (
                  <>
                    {chat.usuarios[0].user.id === jwt(token).secret.id ? (
                      chat.usuarios[0].userTarget.id in fotosUsuarios ? (
                        <img
                          id="imagemPerfilChat"
                          src={fotosUsuarios[chat.usuarios[0].userTarget.id]}
                          alt="imagemPerfil"
                        />
                      ) : (
                        <PersonIcon />
                      )
                    ) : (
                      chat.usuarios[0].user.id in fotosUsuarios ? (
                        <img
                          id="imagemPerfilChat"
                          src={fotosUsuarios[chat.usuarios[0].user.id]}
                          alt="imagemPerfil"
                        />
                      ) : (
                        <PersonIcon />
                      )
                    )}
                  </>
                )}
            <div className="dados">
              {token && chat.privado ?
                <Link to={`/usuario/${chat.usuarios[0].user.id}`}>
                  <span>{chat.usuarios[0].user.id == jwt(token).secret.id ? chat.usuarios[0].userTarget.nome : chat.usuarios[0].user.nome}</span>
                </Link> :
                <span>{chat.nome}</span>
              }

              <div className="digitando">
                <div>
                  {chat.privado && chat.usuarios[0].user.id == jwt(token).secret.id ? `${stringDigitando}` : `${stringDigitando}`}</div>
              </div>
            </div>
            <div id="searchIcon"><SearchIcon /></div>
          </div>


          <div className="conteudoChat" >
            {messagesDB.map((mensagem, index) => {
              return (
                <Link
                  key={index}
                >

                  <div
                    className={jwt(token).secret.id == mensagem.user.id ? "textoChat1" : "textoChatOutro"}>
                    {chat.privado ? mensagem.message : mensagem.user.nome + ": " + mensagem.message}
                    <span className="horario">{new Date(mensagem.horario).getHours() + ':' + new Date(mensagem.horario).getMinutes()}</span>
                  </div>
                </Link>
              );
            })
            }

            {arrayMensagens.map((mensagem, index) => {
              return (
                <Link
                  key={index}
                >
                  {mensagem.idRoom == idChat && <div
                    className={jwt(token).secret.id == mensagem.user.id ? "textoChat1" : "textoChatOutro"}>
                    {mensagem.message}
                  </div>}
                </Link>
              );
            })}

          </div>
        </div >
        

        <form className="formEntradas" action="" onSubmit={handleSubmit}>
          <div className="entradasChat">
            <input
              id="campoDigitacao"
              type="text"
              placeholder="Mensagem"
              value={message}
              required
              maxLength='30'
              onChange={e => {setMessage(e.target.value)}}
            />
            <button type="submit" className="sendMessage">
            <SendIcon/>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
