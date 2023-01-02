import { useForm } from "react-hook-form";
import "./style.css";
import { forumData } from "../Sidebar/data";
import jose from "../../../assets/images/jose.webp";
import janderson from "../../../assets/images/janderson.jpg";
import maria from "../../../assets/images/maria.jpg";
import { Link } from "react-router-dom";
import apiRequest from "../../../services/api";
import { useEffect, useState } from "react";

export default function FormularioPergunta(props) {
  const [data, setData] = useState()
  const [usuario, setUsuarios] = useState([])

  useEffect(() => {
    apiRequest
      .get("usuarios")
      .then((response) => setUsuarios(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }, []);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.setIsFormOpen(false);
    let novaPergunta = {}

    // apiRequest.post("perguntas")
  };

  return (
    <div className="form-card">
      {/* <div className="usuario-pergunta">
        <div className="usuario-informacao-texto">
        <span>{pergunta.usuario.nome_completo}</span>
        <span>{pergunta.usuario.curso}</span>
        </div>
      </div> */}
      <div>
      <select
            name="usuario"
            {...register("usuario")}
            className="engenharia-input"
          >
            {usuario.map((usuario, index) => (
              <option
                value={usuario.nome_completo}
                key={index}
                className="opcao-engenharia"
              >
                {usuario.nome_completo}
              </option>
            ))}
          </select>
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="formulario">
        <div className="group-input">
          <input
            type="text"
            name="titulo"
            {...register("titulo")}
            className="titulo-input"
            placeholder="Título"
          />
          <select
            name="engenharia"
            {...register("engenharia")}
            className="engenharia-input"
          >
            {forumData.map((data, index) => (
              <option
                value={data.name}
                key={index}
                className="opcao-engenharia"
              >
                {data.name}
              </option>
            ))}
          </select>
        </div>
        <textarea
          name="textoPergunta"
          id=""
          cols="30"
          rows="10"
          {...register("textoPergunta")}
          className="texto-pergunta"
          placeholder="Pergunta"
        ></textarea>
        {/* <div className="file-input">
          <input type="file" name="imagem" {...register("imagem")} />
        </div> */}
        <div className="group-input" style={{ justifyContent: "center" }}>
          <button type="submit" className="botao-geral">
            Enviar
          </button>
          <button
            className="botao-geral botao-cancelar"
            onClick={() => props.setIsFormOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
