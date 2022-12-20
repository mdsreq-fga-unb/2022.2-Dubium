import "./style.css"
import { Container, Grid, Box, Link } from '@mui/material'
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer() {
    return (
        <footer className="footer">
            <p>
                <span>Política de Privacidade</span>
            </p>
            <ul>
                <li>
                    <CopyrightIcon/>
                </li>
            </ul>
            <p>
                <Link href="https://github.com/mdsreq-fga-unb/2022.2-Dubium ">2022 Dubium</Link>
            </p>
        </footer>
    );
        
    
}