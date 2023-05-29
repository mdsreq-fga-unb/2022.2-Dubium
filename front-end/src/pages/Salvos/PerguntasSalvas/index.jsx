import "./style.css";

import { useEffect, useState } from "react";

import apiRequest from "../../../services/api";
import jwt from 'jwt-decode' 
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

export default function PerguntasSalvas({ idUsuario }) {
  const [perguntasSalvas, setPerguntasSalvas] = useState([]);
  const [perguntasSalvasCorpo, setPerguntasSalvasCorpo] = useState([])
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
  }, [])

  const getPerguntas = () => {
    apiRequest
    .get(`/usuario/salvos/${jwt(token).secret.id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      setPerguntasSalvas(response.data.perguntas);
    })
    .catch((error) => {});
  }

  useEffect(() => {
    if(perguntasSalvas && token){
      apiRequest.post("/pergunta/salvos", {arrayPerguntas: perguntasSalvas}, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      .then((response) => {
        setPerguntasSalvasCorpo(response.data)
      })
      .catch((err) => {console.log(err)})
    }
  }, [perguntasSalvas])

  useEffect(() => {
    if(token) {
      getPerguntas()
    }
  }, [token]);

  return (
    <ul className="pc-container" style={{ width: "35%", gap: "30px" }}>
      <div className="pc-titulo">
        <span>PERGUNTAS</span>
      </div>
      {perguntasSalvasCorpo.map((pergunta) => (
        <Link
          to={`/pergunta/${pergunta._id}`}
          key={pergunta._id}
        >
          <li className="pc-pergunta">
            <span>{pergunta.titulo}</span>
            <div className="pc-votos">
              <StarIcon fontSize="small" sx={{ color: "#ffa722  " }} />
              <span>{pergunta.favoritado}</span>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
