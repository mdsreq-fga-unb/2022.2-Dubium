import "./style.css";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import apiRequest from "../../../services/api";
import handleCurso from "../../../services/curso";

import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";

export default function PerguntaSelecionada() {
  const [perguntaSelecionada, setPerguntaSelecionada] = useState({});
  const [respostas, setRespostas] = useState([]);
  const [favoritoPergunta, setFavoritoPergunta] = useState(false);
  const [favoritoResposta, setFavoritoResposta] = useState(false);
  const [comentar, setComentar] = useState(false);

  const { idPergunta } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    apiRequest
      .get(`perguntas/${idPergunta}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setPerguntaSelecionada(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);

  const getResposta = async () => {
    await apiRequest
      .get(`respostas/pergunta/${idPergunta}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setRespostas(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  };

  useEffect(() => {
    getResposta();
  }, [comentar]);

  const deletarPergunta = async () => {
    await apiRequest
      .delete(`perguntas/${idPergunta}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        alert("Pergunta deletada!");
      })
      .catch((error) => console.log(error));

    navigate(-1);
  };

  const deletarResposta = async (idResposta) => {
    await apiRequest
      .delete(`respostas/${idResposta}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        alert("Resposta deletada!");
      })
      .catch((error) => console.log(error));

    getResposta();
  };

  const updateFavoritoPergunta = async () => {
    await apiRequest
      .patch(
        favoritoPergunta
          ? `perguntas/menos/${idPergunta}`
          : `perguntas/${idPergunta}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const updateFavoritoResposta = async (idResposta) => {
    await apiRequest
      .patch(
        favoritoResposta
          ? `respostas/menos/${idResposta}`
          : `respostas/${idResposta}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));

    getResposta();
  };

  const salvarPergunta = async () => {
    const infoPergunta = {
      id_usuario: localStorage.getItem("userId"),
      id_pergunta: idPergunta,
    };

    await apiRequest
      .post("/salvas", infoPergunta, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        alert("Pergunta salva com sucesso!");
      })
      .catch((error) => console.log(error));
  };

  const onSubmit = async (data) => {
    let novaResposta = {
      id_usuario: localStorage.getItem("userId"),
      id_pergunta: idPergunta,
      corpoResposta: data.resposta,
    };

    await apiRequest
      .post("respostas", novaResposta, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    setComentar(!comentar);
  };

  return (
    <div className="container">
      <div className="pergunta-selecionada">
        <div className="ps-usuario-container">
          <div className="ps-usuario-info">
            <PersonIcon fontSize="large" />
            <div className="ps-usuario-info-texto">
              <span>{perguntaSelecionada?.usuario?.nome_completo}</span>
              <span style={{ color: "#757575" }}>
                {handleCurso(perguntaSelecionada?.usuario?.curso)}
              </span>
            </div>
          </div>
          {perguntaSelecionada?.usuario?.id ==
            localStorage.getItem("userId") && (
            <IconButton onClick={deletarPergunta}>
              <DeleteIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
        </div>
        <span className="filtro">
          {perguntaSelecionada?.filtro?.toUpperCase()}
        </span>
        <span>{perguntaSelecionada?.corpoPergunta}</span>
        <ul className="container-interacao">
          <div className="ps-favoritar-salvar">
            <li
              className="item-interacao"
              onClick={() => {
                setFavoritoPergunta(!favoritoPergunta);
                updateFavoritoPergunta();
              }}
            >
              <IconButton>
                <StarIcon
                  className={favoritoPergunta ? "corFavorito" : ""}
                  sx={{ fontSize: 16 }}
                />
              </IconButton>
              <span>Favoritar</span>
            </li>
            <li className="item-interacao" onClick={salvarPergunta}>
              <IconButton>
                <BookmarkIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <span>Salvar</span>
            </li>
          </div>
          <li className="item-interacao" onClick={() => setComentar(!comentar)}>
            <IconButton>
              <QuestionAnswerIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <span>Responder</span>
          </li>
        </ul>
        {comentar && (
          <div>
            <form
              action=""
              onSubmit={handleSubmit(onSubmit)}
              className="formulario"
            >
              <div>
                <textarea
                  name="resposta"
                  {...register("resposta")}
                  cols="30"
                  rows="2"
                  placeholder="Comentar"
                  className="comentar"
                  maxLength={500}
                ></textarea>
                <IconButton type="submit">
                  <SendIcon sx={{ fontSize: 20, color: "#166799" }} />
                </IconButton>
              </div>
            </form>
          </div>
        )}
        <ul className="container-resposta">
          {respostas.map((data, index) => (
            <li value={data.id} key={index} className="card-resposta">
              <div className="usuario-informacao-texto">
                <span
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {data.usuario.nome_completo}
                  {data.usuario.id == localStorage.getItem("userId") && (
                    <IconButton
                      onClick={() => {
                        deletarResposta(data.id);
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  )}
                </span>
                <span>{handleCurso(data.usuario.curso)}</span>
              </div>
              <span>{data.corpoResposta}</span>
              <div
                className="ps-favoritar"
                onClick={() => {
                  setFavoritoResposta(!favoritoResposta);
                  updateFavoritoResposta(data.id);
                }}
              >
                <IconButton>
                  <StarIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <span>{data.votosTotais}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
