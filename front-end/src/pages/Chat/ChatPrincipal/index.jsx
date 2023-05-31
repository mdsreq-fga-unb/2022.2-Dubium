import "./style.css";

import imagemPerfil from "../../../assets/images/logo.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import jwt from 'jwt-decode' 


export default function ChatPrincipal() {

  const [ message, setMessage ] = useState("");
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
  }, [])

  const renderMessage = async (message) => {
    const container = document.getElementsByClassName("conteudoChat")[0]
    const novaDiv = document.createElement('div');
    novaDiv.innerHTML = 
    novaDiv.className = 'textoChatUser';
    novaDiv.textContent = `${message.user.nome}: ${message.message}`;
    container.appendChild(novaDiv);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const _message = {
      user: jwt(token).secret,
      message: message,
      horario: new Date()
    }
    await renderMessage(_message)
    setMessage("")
  }

  return token && (
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
