import "./style.css";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { forumData } from "../Sidebar/data";

import apiRequest from "../../../services/api";

export default function FormularioPergunta(props) {
  const [usuario, setUsuarios] = useState([]);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let indexEngenharia;

    switch (data.engenharia) {
      case "ENGENHARIAS":
        indexEngenharia = 1;
        break;
      case "ENGENHARIA AEROESPACIAL":
        indexEngenharia = 2;
        break;
      case "ENGENHARIA AUTOMOTIVA":
        indexEngenharia = 3;
        break;
      case "ENGENHARIA ELETRÔNICA":
        indexEngenharia = 4;
        break;
      case "ENGENHARIA DE ENERGIA":
        indexEngenharia = 5;
        break;
      case "ENGENHARIA DE SOFTWARE":
        indexEngenharia = 6;
        break;
      default:
        indexEngenharia = 1;
    }

    let novaPergunta = {
      id_usuario: data.usuarios | usuario[0].id,
      tituloPergunta: data.titulo,
      id_cursoPergunta: indexEngenharia,
      corpoPergunta: data.textoPergunta,
      filtro: data.filtro,
      arquivo: data.midia,
      votosTotais: 0,
    };
    await apiRequest
      .post("perguntas", novaPergunta)
      .then((response) => {
        alert("Pergunta cadastrada com sucesso!");
      })
      .catch((error) => console.log(error));

    props.setIsFormOpen(false);
  };

  return (
    <div className="form-card">
      {/* <div className="usuario-pergunta">
        <div className="usuario-informacao-texto">
        <span>{usuario.nome_completo}</span>
        <span>{usuario.curso}</span>
        </div>
      </div> */}
      <form action="" onSubmit={handleSubmit(onSubmit)} className="formulario">
        <select
          name="usuarios"
          {...register("usuarios")}
          required
          className="engenharia-input"
          style={{ width: "23.3%" }}
        >
          {usuario.map((data, index) => (
            <option value={data.id} key={index}>
              {data.nome_completo}
            </option>
          ))}
        </select>
        <div className="group-input">
          <input
            type="text"
            name="titulo"
            {...register("titulo")}
            className="titulo-input"
            placeholder="Título"
            required
          />
          <select
            name="engenharia"
            {...register("engenharia")}
            className="engenharia-input"
            required
          >
            {forumData.map(
              (data, index) =>
                index != 0 && (
                  <option
                    value={data.name}
                    key={index}
                    className="opcao-engenharia"
                  >
                    {data.name}
                  </option>
                )
            )}
          </select>
          <input
            type="text"
            name="filtro"
            {...register("filtro")}
            className="filtro-input"
            placeholder="Matéria"
            required
          />
        </div>
        <textarea
          name="textoPergunta"
          id=""
          cols="30"
          rows="10"
          {...register("textoPergunta")}
          className="texto-pergunta"
          placeholder="Pergunta"
          maxLength={1000}
          required
        ></textarea>
        {/* <div className="file-input">
          <input type="file" name="arquivo" {...register("arquivo")} />
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
