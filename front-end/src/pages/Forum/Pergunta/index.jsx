import "./style.css";
import { useEffect, useState } from "react";

import apiRequest from "../../../services/api";
import { useForm } from "react-hook-form";

import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";

export default function Pergunta(props) {
  const [favorito, setFavorito] = useState(false);
  const [comentar, setComentar] = useState(false);
  const [usuario, setUsuarios] = useState([]);
  const [respostas, setRespostas] = useState([]);
  const [novaResposta, setNovaResposta] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  useEffect(() => {
    apiRequest
      .get(`respostas/pergunta/${props.perguntaSelecionada.id}`)
      .then((response) => {
        setRespostas(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, [novaResposta]);

  function deletePergunta() {
    apiRequest.delete(`perguntas/${props.perguntaSelecionada.id}`).then(() => {
      alert("Post deleted!");
    });
    props.setIsPerguntaOpen(false);
  }

  function updateFavotito() {
    apiRequest
      .patch(
        favorito
          ? `perguntas/menos/${props.perguntaSelecionada.id}`
          : `perguntas/${props.perguntaSelecionada.id}`
      )
      .then((response) => {});
  }

  const onSubmit = (data) => {
    let teste = {
      id_usuario: data.usuarios,
      id_pergunta: props.perguntaSelecionada.id,
      corpoResposta: data.resposta,
    };

    console.log(novaResposta);

    setNovaResposta(true);

    console.log(novaResposta);

    // apiRequest.post("respostas", teste);
  };

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
    <div className="card-pergunta pergunta-selecionada">
      <div className="usuario-informacao-texto">
        <div className="delete">
          {/* <span>{props.perguntaSelecionada.usuario.fotoPerfil}</span> */}
          <span>{props.perguntaSelecionada.usuario.nome_completo}</span>
          <IconButton style={{ width: "20" }} onClick={deletePergunta}>
            <DeleteIcon />
          </IconButton>
        </div>
        <span>{handleCurso(props.perguntaSelecionada.usuario.curso)}</span>
      </div>
      <span>{props.perguntaSelecionada.corpoPergunta}</span>
      {/* <div className="like-comentario">
        <StarIcon />
        <span>{props.perguntaSelecionada.votosTotais} favoritos</span>
      </div> */}
      <ul className="container-interacao">
        <li
          className="item-interacao"
          onClick={() => {
            setFavorito(!favorito);
            updateFavotito();
          }}
        >
          <IconButton>
            <StarIcon className={favorito ? "corFavorito" : ""} />
          </IconButton>
          <span>Favoritar</span>
        </li>
        <li className="item-interacao" onClick={() => setComentar(!comentar)}>
          <IconButton>
            <QuestionAnswerIcon />
          </IconButton>
          <span>Responder</span>
        </li>
      </ul>
      {comentar && (
        <div>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <select name="usuarios" {...register("usuarios")}>
              {usuario.map((data, index) => (
                <option
                  value={data.id}
                  key={index}
                  className="opcao-engenharia"
                >
                  {data.nome_completo}
                </option>
              ))}
            </select>
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
              <SendIcon className="comentario" />
            </IconButton>
          </form>
        </div>
      )}
      <ul className="resposta">
        {respostas.map((data, index) => (
          <li value={data.id} key={index} className="teste">
            <div className="usuario-informacao-texto">
              {/* <span>{data.usuario.fotoPerfil}</span> */}
              <span>{data.usuario.nome_completo}</span>
              <span>{handleCurso(data.usuario.curso)}</span>
            </div>
            <span>{data.corpoResposta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
