import "./style.css";

import handleCurso from "../../services/curso";

import { Link } from "react-router-dom";
import { pesquisaUsuario } from "../../services/pesquisa";

export default function RankingUsuarios({ usuarios, materiaPesquisada }) {

  const usuariosFiltrados = pesquisaUsuario(usuarios, materiaPesquisada);

  return (
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
  );
}
