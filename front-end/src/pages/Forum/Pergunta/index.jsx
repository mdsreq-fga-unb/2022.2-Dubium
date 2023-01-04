import "./style.css";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useState } from "react";
import apiRequest from "../../../services/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";

export default function Pergunta(props) {
  
  const [favorito, setFavorito] = useState(false)
  // const [handleDelete, setDelete] = useState(false)
  // const navigate = useNavigate()
  // useEffect(() => {
  //   apiRequest
  //   .delete(`perguntas/${props.perguntaSelecionada.id}`)
  //   .then((response) => {
  //     navigate(-1);
  //   }).catch((err) => {
  //     console.error("ops! ocorreu um erro" + err);
  //   });
  //   // navigate(-1);
  // }, [handleDelete]);

  const handleDelete = async() => {
    apiRequest.delete(`perguntas/${props.perguntaSelecionada.id}`)
  }

  return (
    <div className="card-pergunta pergunta-selecionada">
      <div className="usuario-informacao-texto">
        <div className="delete">
        <span>{props.perguntaSelecionada.usuario.nome_completo}</span>
        <IconButton style={{width: '20'}} onClick={()=> {handleDelete()}}>
          <DeleteIcon />
        </IconButton>
        
        </div>
        <span>{props.perguntaSelecionada.usuario.curso}</span>
      </div>
      <span>{props.perguntaSelecionada.corpoPergunta}</span>
      {/* <div className="like-comentario">
        <StarIcon />
        <span>{props.perguntaSelecionada.votosTotais} favoritos</span>
      </div> */}
      <ul className="container-interacao">
        <li className="item-interacao" onClick={()=> {setFavorito(!favorito)}}>
          <IconButton>
           <StarIcon className={favorito&&"corFavorito"}/>
          </IconButton>
          <span>Favoritar</span>
        </li>
        <li className="item-interacao">
          <IconButton>
            <QuestionAnswerIcon />
          </IconButton>
          <span>Responder</span>
        </li>
      </ul>
      <textarea
        name=""
        id=""
        cols="30"
        rows="2"
        placeholder="Comentar"
        className="comentar"
      ></textarea>
      {/* {props.pergunta.respostas.map((resposta, index) => {
        return (
          <div className="resposta">
            <div className="usuario-informacao-texto">
              <span>{resposta.userResposta.nome}</span>
              <span>{resposta.userResposta.curso}</span>
            </div>
            <div>{resposta.textoResposta}</div>
            <ul className="container-resposta-interacao">
              <li className="item-interacao">
                <StarIcon />
                <span>Favoritar</span>
              </li>
              <li className="item-interacao">
                <QuestionAnswerIcon />
                <span
                  onClick={() => {
                    props.setIsPerguntaOpen(true);
                    props.setIndexPergunta(index);
                  }}
                >
                  Responder
                </span>
              </li>
            </ul>
          </div>
        );
      })} */}
    </div>
  );
}
