import "./style.css";

import { useEffect, useState } from "react";
import jwt from 'jwt-decode';
import apiRequest from "../../../services/api";

import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

export default function PerguntasCadastradas({ idUsuario }) {
  const [perguntasCadastradas, setPerguntasCadastradas] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
  }, [])

  const getPerguntas = () => {
    apiRequest
      .get(`/usuario/pergunta/${idUsuario}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setPerguntasCadastradas(response.data);
      })
      .catch((error) => {});
  }

  useEffect(() => {
    if(token){
      getPerguntas()
    }
  }, [token]);

  return (
    <ul className="pc-container">
      <div className="pc-titulo">
        <span>PERGUNTAS</span>
      </div>
      {perguntasCadastradas.map((perguntaCadastrada) => (
        <Link
          to={`/pergunta/${perguntaCadastrada._id}`}
          key={perguntaCadastrada._id}
        >
          <li className="pc-pergunta">
            <span>{perguntaCadastrada.titulo}</span>
            <div className="pc-votos">
              <StarIcon fontSize="small" sx={{ color: "#ffa722  " }} />
              <span>{perguntaCadastrada.favoritado}</span>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
