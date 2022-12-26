import { useForm } from "react-hook-form";
import "./style.css";
import { forumData } from "../Sidebar/data";
import jose from "../../../assets/images/jose.webp";
import janderson from "../../../assets/images/janderson.jpg";
import maria from "../../../assets/images/maria.jpg";
import { Link } from "react-router-dom";

export default function FormularioPergunta(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.setIsFormOpen(false);
    props.setPerguntas([
      ...props.perguntas,
      {
        textoPergunta: data.textoPergunta,
        dataPergunta: "15/02/2022",
        userPergunta: {
          nome: "José",
          curso: "Engenharia de Software",
          foto: jose,
        },
        respostas: [],
        engenharia: data.engenharia,
      },
    ]);
  };

  return (
    <div className="form-card">
      <div className="usuario-pergunta">
        <img src={jose} alt="" className="avatar" />
        <div className="usuario-informacao-texto">
          <span>José</span>
          <span>Engenharia de Software</span>
        </div>
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
        <div className="file-input">
          <input type="file" name="imagem" {...register("imagem")} />
        </div>
        <div className="group-input">
          <button type="submit" className="botao-enviar">
            Enviar
          </button>
          <button
            className="botao-cancelar"
            onClick={() => props.setIsFormOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
