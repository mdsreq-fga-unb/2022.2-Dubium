import "./style.css";

import imagemPerfil from "../../../assets/images/logo.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import jwt from 'jwt-decode' 
import io from 'socket.io-client';



export default function ChatPrincipal() {

  const [ message, setMessage ] = useState("");
  const [token, setToken] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setToken(document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
    setSocket(io('http://localhost:8080'));
  }, [])

  const renderMessage = async (message) => {
    const container = document.getElementsByClassName("conteudoChat")[0]
    const novaDiv = document.createElement('div');
    novaDiv.innerHTML = 
    novaDiv.className = 'textoChatUser';
    novaDiv.textContent = `${message.user.nome}: ${message.message}`;
    container.appendChild(novaDiv);
  }


  useEffect(() => {
    if (socket) {
      socket.on("receivedMessage", (message) => {
        renderMessage(message)
      });
    }
  }, [socket]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let _message = {
      user: jwt(token).secret,
      message: message,
      horario: new Date()
    }
    await renderMessage(_message)
    socket.emit("sendMessage", _message)
    setMessage("")
  }


  return token && socket && (
    <div className="containerChat">
      <div className="chat-principal">


        <div id="corFundo">

          <div className="dadosUsuario">
            <img id="imagemPerfilChat" src={imagemPerfil} alt="imagemPerfil" />
            Dados Pessoais

            <div id="searchIcon"><SearchIcon /></div>
          </div>

          <div className="conteudoChat">
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
