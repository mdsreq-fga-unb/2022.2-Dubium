import "./style.css"
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../../assets/images/logo.jpg'
import { Container } from "@mui/system";
import { Link } from "@mui/material";

function Header() {
    return(
        <header className="header">
            <img src={logo} alt="logo" className="logo"/>
            <span>SOBRE</span>
            <span>FORUM</span>
            <span>CHAT</span>
            <div className="input">
                <SearchIcon/>
                <input type="text" placeholder="Buscar"/>
            </div>
            <div className="input">
                <span>SAIR</span>
                <LogoutIcon/>
            </div>
        </header>
    )
}

export default Header;