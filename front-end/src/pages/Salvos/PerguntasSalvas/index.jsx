import "./style.css";

import { useEffect, useState } from "react";

import apiRequest from "../../../services/api";

import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

export default function PerguntasSalvas({ idUsuario }) {
  const [perguntasSalvas, setPerguntasSalvas] = useState([]);

  useEffect(() => {
    apiRequest
      .get(`salvas/1`)
      .then((response) => {
        setPerguntasSalvas(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <ul className="pc-container" style={{ width: "35%" }}>
      <div className="pc-titulo">
        <span>PERGUNTAS</span>
      </div>
      {perguntasSalvas.map((perguntaSalva) => (
        <Link to={`/pergunta/${perguntaSalva.pergunta.id}`}>
          <li className="pc-pergunta">
            <span>{perguntaSalva.pergunta.tituloPergunta}</span>
            <div className="pc-votos">
              <StarIcon fontSize="small" sx={{ color: "#ffa722  " }} />
              <span>{perguntaSalva.pergunta.votosTotais}</span>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
