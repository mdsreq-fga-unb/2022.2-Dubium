import { useEffect, useState } from "react";
import apiRequest from "../../services/api";
import { redirect, useNavigate } from "react-router-dom";
import handleCurso from "../../services/curso";
import "./style.css";

export default function RankingUsuarios(props) {
  const [arrayUsuario, setArrayUsuario] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest
      .get("usuarios")
      .then((response) => {
        setArrayUsuario(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  return (
    <ul className="ranking-usuario">
      {arrayUsuario.map((usuario, index) => (
        <li
          key={index}
          className="usuario-ranqueado"
          onClick={() => {
            props.setIdUsuario(usuario.id);
            navigate("/usuario");
          }}
        >
          <span>{usuario.fotoPerfil}</span>
          <span>{usuario.nome_completo}</span>
          <span>{handleCurso(usuario.curso)}</span>
          <span>Favoritos: {usuario.votosTotais}</span>
        </li>
      ))}
    </ul>
  );
}
