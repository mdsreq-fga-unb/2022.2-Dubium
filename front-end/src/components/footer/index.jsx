import "./style.css";

import CopyrightIcon from "@mui/icons-material/Copyright";
import { Link } from "@mui/material";

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        <span>Política de Privacidade</span>
      </p>
      <ul>
        <li>
          <CopyrightIcon />
        </li>
      </ul>
      <p className="p">
        <Link href="https://github.com/mdsreq-fga-unb/2022.2-Dubium">
          2022 Dubium
        </Link>
      </p>
    </footer>
  );
}
