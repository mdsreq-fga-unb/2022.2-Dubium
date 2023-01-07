import { useEffect, useState } from "react";
import apiRequest from "../../services/api";
import { redirect, useNavigate } from "react-router-dom";
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

  function handleCurso(curso) {
    let nomeCurso;

    switch (curso) {
      case 1:
        nomeCurso = "Engenharias";
        break;
      case 2:
        nomeCurso = "Engenharia Aeroespacial";
        break;
      case 3:
        nomeCurso = "Engenharia Automotiva";
        break;
      case 4:
        nomeCurso = "Engenharia Eletrônica";
        break;
      case 5:
        nomeCurso = "Engenharia de Energia";
        break;
      case 6:
        nomeCurso = "Engenharia Software";
        break;

      default:
        break;
    }

    return nomeCurso;
  }

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
