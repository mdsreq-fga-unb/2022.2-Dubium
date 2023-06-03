import "./style.css";

import imagemPerfil from "../../../assets/images/logo.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import jwt from 'jwt-decode'
import io from 'socket.io-client';
import apiRequest from '../../../services/api.js'



export default function ChatPrincipal({ setLogado }) {

  const [message, setMessage] = useState("");
  const [token, setToken] = useState('');
  const [socket, setSocket] = useState(null);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
  const [chat, setChat] = useState('')
  const { idChat } = useParams();
  const [array, setArray] = useState([]);

  const { idUsuario } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
    setSocket(io('http://localhost:8080'));
  }, [])

  useEffect(() => {
    if(token) {
      getUsuario()
    }
  }, [token])

  useEffect(() => {
    if (socket) {
      socket.emit('joinInstance', usuarioSelecionado.chats)
      socket.on("receivedMessage", (message) => {
        setArray((prevArray) => [...prevArray, message]);
      });
    }
  }, [usuarioSelecionado]);

  const getChat = async () => {
    await apiRequest
      .get(`/chat/${idChat}`, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      .then(data => {
        setChat(data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    if(token && idChat){
      getChat()
    }
  }, [token, idChat]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let _message = {
      user: jwt(token).secret,
      message: message,
      horario: new Date(),
      idRoom: idChat
    }
    setArray((prevArray) => [...prevArray, _message]);
    socket.emit("sendMessage", _message)
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



  return token && socket && chat && usuarioSelecionado && array && (
    <div className="containerChat">
      <div className="chat-principal">

        <div id="corFundo">

          <div className="dadosUsuario">
            <img id="imagemPerfilChat" src={imagemPerfil} alt="imagemPerfil" />
            <span>{chat.usuarios[0].user.id == jwt(token).secret.id ? chat.usuarios[0].userTarget.nome : chat.usuarios[0].user.nome}</span>
            <div id="searchIcon"><SearchIcon /></div>
          </div>

          <div className="conteudoChat">
            {chat.mensagens.map((mensagem, index) => {
              return (
                <Link
                  key={index}
                >
                  {<div className="textoChatUser">{mensagem.user.nome}: {mensagem.message}</div>}
                </Link>
              );
            })}

            {array.map((mensagem, index) => {
              return (
                <Link
                  key={index}
                >
                  {mensagem.idRoom == idChat &&<div className="textoChatUser">{mensagem.user.nome}: {mensagem.message}</div>}
                </Link>
              );
            })}

          </div>

        </div >

        <form action="" onSubmit={handleSubmit}>
          <div className="entradasChat">
            <input
              id="campoDigitacao"
              type="text"
              placeholder="Mensagem"
              value={message}
              required
              maxLength='30'
              onChange={e => setMessage(e.target.value)}
            />
            <button type="submit" className="sendMessage">
              enviar
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
