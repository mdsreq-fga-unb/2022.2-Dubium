import { useForm } from "react-hook-form";
import "./style.css";
import { forumData } from "../Sidebar/data";
import jose from "../../../assets/images/jose.webp";
import janderson from "../../../assets/images/janderson.jpg";
import maria from "../../../assets/images/maria.jpg";

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
        pergunta: data.pergunta,
        data: "15/02/2022",
        user: {
          nome: "José",
          foto: jose,
        },
        respostas: [
          {
            resposta: "azuis",
            user: {
              nome: "Janserson",
              foto: janderson,
            },
          },
        ],
        engenharia: props.engenharia,
      },
    ]);
  };

  return (
    <div className="form-card">
      <div className="user-card">
        <img src={jose} alt="" className="avatar" />
        <span>José</span>
      </div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="group-input">
          <input type="text" name="titulo" {...register("titulo")} />
          <select name="engenharia" {...register("engenharia")}>
            {forumData.map((data, index) => (
              <option value={data.name} key={index}>
                {data.name}
              </option>
            ))}
          </select>
        </div>
        <textarea
          name="pergunta"
          id=""
          cols="30"
          rows="10"
          {...register("pergunta")}
        ></textarea>
        <div>
          <input type="file" name="imagem" {...register("imagem")} />
        </div>
        <div className="group-input">
          <button type="submit">Enviar</button>
          <button>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
