import "./style.css";

import bichinho from "../../assets/images/bichinho.png";
import logo from "../../assets/images/lgLetraBranca.png";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import isAuthenticated from "../../isAuth";

import jwt from 'jwt-decode' 

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRequest from "../../services/api";



function Header({ setMateriaPesquisada, setLogado }) {
  const [token, setToken] = useState('');

  const handleChange = (e) => {
    e.preventDefault();
    setMateriaPesquisada(e.target.value);
  };



  useEffect(() => {
    setToken(document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
  }, [])



  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <ul className="list">
        <li className="item">
          <Link to="/">FÓRUM</Link>
        </li>
        <li className="item">
          <Link to={isAuthenticated() ? "/avisos" : "/login"}>
            AVISOS
          </Link>
        </li>
        <li className="item">
          <Link
          // se nao tiver logado redireciona pra login
            to={isAuthenticated() ? "/ranking-usuarios" : "/login"}
          >
            USUARIOS
          </Link>
        </li>
        <li className="item">
          <Link to="/sobre">SOBRE</Link>
        </li>
      </ul>
      <div className="pesquisa">
        <div id ="iconePesquisa"><SearchIcon /></div>
        <input id = "busca"
          type="text"
          placeholder="Buscar por matéria ou usuário"
          onChange={handleChange}
        />
      </div>
      <ul className="header-login">
        {!isAuthenticated() && (
          <>
            <Link to="/login">
              <li className="login-item">
                <LoginIcon />
                <span>Entrar</span>
              </li>
            </Link>
            <Link to="/cadastrar-usuario">
              <li className="login-item">
                <PersonAddIcon />
                <span>Cadastrar-se</span>
              </li>
            </Link>
          </>
        )}
        {isAuthenticated() && (
          <>
          {/* recuperar api de informações do usuario */}
          { token ? 
            <Link to={`/usuario/${jwt(token).secret.id}`}> 
              <li className="login-item">
                <PersonIcon />
                <span>Perfil</span>
              </li>
            </Link> :
            <></>
          }
            <Link
              to="/"
              onClick={() => {
                document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                setLogado(false);
              }}
            >
              <li className="login-item">
                <LogoutIcon />
                <span>Sair</span>
              </li>
            </Link>
          </>
        )}
      </ul>

      <img src={bichinho} alt="bichinho" className="bichinho" />
    </header>
  );
}

export default Header;
