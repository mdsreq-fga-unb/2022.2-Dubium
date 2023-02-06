import "./style.css";

import { useEffect, useState } from "react";

import apiRequest from "../../../services/api";

import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

export default function PerguntasCadastradas({ idUsuario }) {
  const [perguntasCadastradas, setPerguntasCadastradas] = useState([]);

  useEffect(() => {
    apiRequest
      .get(`perguntas/usuario/${idUsuario}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setPerguntasCadastradas(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <ul className="pc-container">
      <div className="pc-titulo">
        <span>PERGUNTAS</span>
      </div>
      {perguntasCadastradas.map((perguntaCadastrada) => (
        <Link
          to={`/pergunta/${perguntaCadastrada.id}`}
          key={perguntaCadastrada.id}
        >
          <li className="pc-pergunta">
            <span>{perguntaCadastrada.tituloPergunta}</span>
            <div className="pc-votos">
              <StarIcon fontSize="small" sx={{ color: "#ffa722  " }} />
              <span>{perguntaCadastrada.votosTotais}</span>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
