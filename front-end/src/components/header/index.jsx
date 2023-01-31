import "./style.css";

import bichinho from "../../assets/images/bichinho.png";
import logo from "../../assets/images/logo.jpg";

import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";

import { Link } from "react-router-dom";

function Header(props) {
  const handleChange = (e) => {
    e.preventDefault();
    props.setMateriaPesquisada(e.target.value);
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
      <div className="input">
        <Link to="/">SAIR</Link>
        <LogoutIcon />
      </div>
      <div className="fundo-bichinho">
        <img src={bichinho} alt="bichinho" className="bichinho" />
      </div>
    </header>
  );
}

export default Header;
