import "./style.css";

import bichinho from "../../assets/images/bichinho.png";
import logo from "../../assets/images/logo.jpg";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiRequest from "../../services/api";

function Header({ setMateriaPesquisada, setLogado }) {
  const handleChange = (e) => {
    e.preventDefault();
    setMateriaPesquisada(e.target.value);
  };

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
          <Link to="/avisos">AVISOS</Link>
        </li>
        <li className="item">
          <Link to="/ranking-usuarios">USUARIOS</Link>
        </li>
        <li className="item">
          <Link to="/sobre">SOBRE</Link>
        </li>
      </ul>
      <div className="pesquisa">
        <SearchIcon />
        <input
          type="text"
          placeholder="BUSCAR POR MATÉRIA OU USUÁRIO"
          onChange={handleChange}
        />
      </div>
      <ul className="header-login">
        {!localStorage.getItem("token") && (
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
        {localStorage.getItem("token") && (
          <>
            <Link to={`/usuario/${localStorage.getItem("userId")}`}>
              <li className="login-item">
                <PersonIcon />
                <span>Perfil</span>
              </li>
            </Link>
            <Link
              to="/"
              onClick={() => {
                localStorage.clear();
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
