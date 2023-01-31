import "./style.css";

import handleCurso from "../../services/curso";

import { Link } from "react-router-dom";
import { pesquisaUsuario } from "../../services/pesquisa";
import { useEffect, useState } from "react";
import apiRequest from "../../services/api";

export default function RankingUsuarios({ materiaPesquisada }) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    apiRequest
      .get("usuarios")
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const usuariosFiltrados = pesquisaUsuario(usuarios, materiaPesquisada);

  return (
    <div className="container" style={{ marginLeft: "-301px" }}>
      <ul className="ranking-usuario">
        {usuariosFiltrados.map((usuario, index) => (
          <Link
            to={`/usuario/${usuario.id}`}
            key={index}
            style={{ width: "60%" }}
          >
            <li className="usuario-ranqueado">
              <span>{usuario.fotoPerfil}</span>
              <span>{usuario.nome_completo}</span>
              <span>{handleCurso(usuario.curso)}</span>
              <span>Favoritos: {usuario.votosTotais}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
