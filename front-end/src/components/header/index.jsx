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
                <ul className="list">
                    <li className="item">
                        <Link href="/sobre">SOBRE</Link>
                    </li>
                    <li className="item">
                        <Link href="/">FÓRUM</Link>
                    </li>
                    <li className="item">
                        <Link href="/chat">CHAT</Link>
                    </li>
                </ul>
            <div className="input">
                <SearchIcon/>
                <input type="text" placeholder="Buscar"/>
            </div>
            <div className="input">
                <li>
                    <Link href="/">SAIR</Link>
                </li>
                <LogoutIcon/>
            </div>
        </header>
    )
}

export default Header;