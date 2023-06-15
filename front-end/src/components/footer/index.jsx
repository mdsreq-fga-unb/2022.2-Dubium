import "./style.css";

import CopyrightIcon from "@mui/icons-material/Copyright";
import { Link } from "@mui/material";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        <span>Política de Privacidade</span>
      </p>
          <CopyrightIcon />
      <p className="p">
        <a href="https://mdsreq-fga-unb.github.io/2023.1-Dubium2.0/">
        2022 Dubium
        </a>
      </p>
    </footer>
  );
}
