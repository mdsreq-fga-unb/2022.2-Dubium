import { useEffect, useState } from "react";
import apiRequest from "../../services/api";
import { Link, redirect, useNavigate } from "react-router-dom";
import handleCurso from "../../services/curso";
import "./style.css";

export default function RankingUsuarios({ usuarios }) {
  return (
    <ul className="ranking-usuario">
      {usuarios.map((usuario, index) => (
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
