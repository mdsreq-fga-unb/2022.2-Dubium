import "./style.css";

import { useEffect, useState } from "react";

import apiRequest from "../../../services/api";

import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

export default function PerguntasSalvas({ idUsuario }) {
  const [perguntasSalvas, setPerguntasSalvas] = useState([]);

  useEffect(() => {
    apiRequest
      .get(`salvas/${localStorage.getItem("userId")}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setPerguntasSalvas(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <ul className="pc-container" style={{ width: "35%", gap: "30px" }}>
      <div className="pc-titulo">
        <span>PERGUNTAS</span>
      </div>
      {perguntasSalvas.map((perguntaSalva) => (
        <Link
          to={`/pergunta/${perguntaSalva.pergunta.id}`}
          key={perguntaSalva.id}
        >
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
