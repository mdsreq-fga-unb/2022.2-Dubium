import "./style.css";

import { useEffect, useState } from "react";

import apiRequest from "../../../services/api";

import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

export default function AvisosSalvos({ idUsuario }) {
  const [avisosSalvos, setAvisosSalvos] = useState([]);

  useEffect(() => {
    apiRequest
      .get(`salvos/${localStorage.getItem("userId")}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setAvisosSalvos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ul className="pc-container" style={{ width: "35%" }}>
      <div className="pc-titulo">
        <span>AVISOS</span>
      </div>
      {avisosSalvos.map((avisoSalvo) => (
        <Link to={`/avisos/aviso/${avisoSalvo.aviso.id}`}>
          <li className="pc-pergunta">
            <span>{avisoSalvo.aviso.tituloAviso}</span>
            <div className="pc-votos">
              <StarIcon fontSize="small" sx={{ color: "#ffa722  " }} />
              <span>{avisoSalvo.aviso.votosTotais}</span>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
