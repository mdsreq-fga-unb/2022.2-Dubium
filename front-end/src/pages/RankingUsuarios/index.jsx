import "./style.css";

import handleCurso from "../../services/curso";

import { Link } from "react-router-dom";
import { pesquisaUsuario } from "../../services/pesquisa";
import { useContext, useEffect, useState } from "react";
import apiRequest from "../../services/api";
import AuthContext from "../../context/AuthProvider";

import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";

export default function RankingUsuarios({ materiaPesquisada }) {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    apiRequest
      .get("usuarios", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
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
            style={{ width: "50%" }}
          >
            <li className="usuario-ranqueado">
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <PersonIcon fontSize="large" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <span>{usuario.nome_completo}</span>
                  <span>{handleCurso(usuario.curso)}</span>
                </div>
              </div>
              <div className="ru-favorito">
                <StarIcon sx={{ color: "#ffa722", fontSize: 16 }} />
                <span>{usuario.votosTotais} favoritos</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
