import "./style.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import apiRequest from "../../../services/api";
import handleCurso from "../../../services/curso";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";

import { IconButton } from "@mui/material";

export default function AvisoSelecionado() {
  const [avisoSelecionado, setAvisoSelecionado] = useState({});
  const [favorito, setFavorito] = useState(false);

  const { idAviso } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    apiRequest
      .get(`avisos/${idAviso}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setAvisoSelecionado(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const deleteAviso = async () => {
    await apiRequest
      .delete(`avisos/${idAviso}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        alert("Aviso deletado!");
      })
      .catch((error) => console.log(error));

    navigate(-1);
  };

  const updateFavotito = async () => {
    await apiRequest
      .patch(favorito ? `avisos/menos/${idAviso}` : `avisos/${idAviso}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const salvarAviso = async () => {
    const infoAviso = {
      id_usuario: localStorage.getItem("userId"),
      id_aviso: idAviso,
    };

    await apiRequest
      .post("/salvos", infoAviso, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert("Aviso salvo com sucesso!");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container">
      <div className="pergunta-selecionada">
        <div className="ps-usuario-container">
          <div className="ps-usuario-info">
            <PersonIcon fontSize="large" />
            <div className="ps-usuario-info-texto">
              <span>{avisoSelecionado?.usuario?.nome_completo}</span>
              <span style={{ color: "#757575" }}>
                {handleCurso(avisoSelecionado?.usuario?.curso)}
              </span>
            </div>
          </div>
          {avisoSelecionado?.usuario?.id == localStorage.getItem("userId") && (
            <IconButton onClick={deleteAviso}>
              <DeleteIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
        </div>
        <span className="filtro">
          {avisoSelecionado?.filtro?.toUpperCase()}
        </span>
        <span>{avisoSelecionado?.corpoAviso}</span>
        <ul className="ps-favoritar-salvar">
          <li
            className="item-interacao"
            onClick={() => {
              setFavorito(!favorito);
              updateFavotito();
            }}
          >
            <IconButton>
              <StarIcon
                className={favorito ? "corFavorito" : ""}
                sx={{ fontSize: 16 }}
              />
            </IconButton>
            <span>Favoritar</span>
          </li>
          <li className="item-interacao" onClick={salvarAviso}>
            <IconButton>
              <BookmarkIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <span>Salvar</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
