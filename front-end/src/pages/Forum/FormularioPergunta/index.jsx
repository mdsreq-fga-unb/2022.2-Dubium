import { useForm } from "react-hook-form";
import "./style.css";
import { forumData } from "../Sidebar/data";
import jose from "../../../assets/images/jose.webp";

export default function FormularioPergunta() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data.titulo);
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
            {forumData.map((data) => (
              <option value={data.name}>{data.name}</option>
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
