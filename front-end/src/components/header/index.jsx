import "./style.css";

import bichinho from "../../assets/images/bichinho.png";
import logo from "../../assets/images/lgLetraBranca.png";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import SendIcon from '@mui/icons-material/Send';
import CriarSala from "../../pages/SalasPublico/CriarSala";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import isAuthenticated from "../../isAuth";

import jwt from 'jwt-decode'

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRequest from "../../services/api";



function Header({ setMateriaPesquisada, setLogado }) {
  const [token, setToken] = useState('');
  const [mostrarDivSala, setMostrarDivSala] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setMateriaPesquisada(e.target.value);
  };

  const divCriarSala = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: mostrarDivSala ? 'flex' : 'none',
  };
  const handleClickCampoCriarSala = () => {
    setMostrarDivSala(false);
    console.log(''+ mostrarDivSala);
  };
  const icon = {
    cursor: 'pointer',
  };
const iconSairDiv = {
  margin: '2rem',
  cursor: 'pointer',
  color: 'black',
  width: '1%',
  height: '1%',
  display: 'flex',
  alignText: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '15px',
};

  const handleClickIcone = () => {
    setMostrarDivSala(!mostrarDivSala);
  };


  const estiloMensagem = {
    transform: 'rotate(-38deg)'
  };



  useEffect(() => {
    setToken(document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
  }, [])



  return (
    <div className="headerDivs">
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
          <div id="iconePesquisa"><SearchIcon /></div>
          <input id="busca"
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
              {token ?

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

              <li className="notification-item">
                <label onClick={handleClickIcone} htmlFor="CriarSala"><GroupAddIcon style={icon} /></label>
                <Link to="/salasPublico"><GroupsIcon/></Link>
              </li>

              <li className="notification-item">
                <Link to="/chat"><SendIcon style={estiloMensagem} /></Link>
              </li>

            </>
          )}
        </ul>

        <img src={bichinho} alt="bichinho" className="bichinho" />
      </header>
      {mostrarDivSala && (
      <div style={divCriarSala} ><CriarSala onClick={handleClickCampoCriarSala} />

        <div htmlFor="sairDiv" onClick={handleClickCampoCriarSala} style={iconSairDiv}> <HighlightOffIcon style={{fontSize: '3rem'}} /> </div>
      </div>
      )}
    </div>
  );
}

export default Header;