import "./style.css";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/images/logo-dubium.png";
import { Link } from "react-router-dom";
import bichinho from "../../assets/images/question-sem-fundo.png";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="logo" className="logo" />
      <ul className="list">
        <li className="item">
          <Link to="/">FÓRUM</Link>
        </li>
        <li className="item">
          <Link to="/chat">CHAT</Link>
        </li>
        <li className="item">
          <Link to="/about">SOBRE</Link>
        </li>
      </ul>
      <div className="input">
        <SearchIcon />
        <input type="text" placeholder="Buscar" />
      </div>
      <div className="input">
          <Link to="/">SAIR</Link>
        <LogoutIcon />
      </div>
      <img src={bichinho} alt="bichinho" className="logo" />
    </header>
  );
}

export default Header;
