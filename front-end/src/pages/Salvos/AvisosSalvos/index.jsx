import "./style.css";

import { useEffect, useState } from "react";

import apiRequest from "../../../services/api";
import jwt from 'jwt-decode' 
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

export default function AvisosSalvos({ idUsuario }) {
  const [avisosSalvos, setAvisosSalvos] = useState([]);
  const [avisosSalvosCorpo, setAvisosSalvosCorpo] = useState([])
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
  }, [])

  const getAvisos = () => {
    apiRequest
    .get(`/usuario/salvos/${jwt(token).secret.id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      setAvisosSalvos(response.data.avisos);
    })
    .catch((error) => {});
  }
  useEffect(() => {
    if(avisosSalvos && token){
      apiRequest.post("/aviso/salvos", {arrayAvisos: avisosSalvos}, {
        headers: {
          Authorization: "Bearer " + token,
        }
      })
      .then((response) => {
        setAvisosSalvosCorpo(response.data)
      })
      .catch((err) => {console.log(err)})
    }
  }, [avisosSalvos])

  useEffect(() => {
    if(token) {
      getAvisos()
    }
  }, [token]);


  return token && (
    <ul className="pc-container" style={{ width: "35%", gap: "30px" }}>
      <div className="pc-titulo">
        <span>AVISOS</span>
      </div>
      {avisosSalvosCorpo.map((avisoSalvo) => (
        <Link to={`/avisos/aviso/${avisoSalvo._id}`} key={avisoSalvo._id}>
          <li className="pc-pergunta">
            <span>{avisoSalvo?.titulo}</span>
            <div className="pc-votos">
              <StarIcon fontSize="small" sx={{ color: "#ffa722  " }} />
              <span>{avisoSalvo?.votos}</span>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
