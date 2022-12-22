import "./style.css";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/images/logo.jpg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link className="logo">
        <img src={logo} alt="logo" className="logo" />
      </Link>
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
    </header>
  );
}

export default Header;
