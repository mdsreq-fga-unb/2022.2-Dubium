import { useEffect, useState } from "react";
import apiRequest from "../../services/api";
import "./style.css";

export default function RankingUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    apiRequest
      .get("usuarios")
      .then((response) => {
        setUsuarios(response.data);
        console.log(response.data);
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
      {usuarios.map((usuario, index) => (
        <li className="usuario-ranqueado">
          <span>{usuario.nome_completo}</span>
          <span>{handleCurso(usuario.curso)}</span>
          <span>Favoritos: {usuario.votosTotais}</span>
        </li>
      ))}
    </ul>
  );
}
