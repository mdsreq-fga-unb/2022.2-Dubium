import "./style.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { forumData } from "../Forum/Sidebar/data";
import apiRequest from "../../services/api";
import { useEffect } from "react";
import { useState } from "react";

export default function EditarUsuario() {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
  const { idUsuario } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    apiRequest
      .get(`usuarios/${idUsuario}`)
      .then((response) => {
        setUsuarioSelecionado(response.data);
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
        break;
    }

    let usuarioEditado = {
      nome_completo: data.nome_completo,
      matricula: data.matricula,
      curso: indexEngenharia,
      celular: data.celular,
      email: data.email,
      senha: data.senha,
    };

    await apiRequest
      .put(`usuarios/${idUsuario}`, usuarioEditado)
      .then((response) => {
        alert("Seus dados foram editados com sucesso!");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="cadastrar-usuario">
      <form action="" onSubmit={handleSubmit(onSubmit)} className="cdu-form">
        <div className="cdu-form-campos">
          <input
            type="text"
            name="nome_completo"
            {...register("nome_completo")}
            placeholder="Nome Completo"
            required
            className="cdu-campos"
            defaultValue={usuarioSelecionado?.nome_completo}
          />
          <input
            type="number"
            name="matricula"
            {...register("matricula")}
            placeholder="Matrícula"
            required
            className="cdu-campos"
            defaultValue={usuarioSelecionado?.matricula}
          />
          <select
            name="engenharia"
            {...register("engenharia")}
            required
            className="cdu-campos"
            defaultValue={usuarioSelecionado?.engenharia}
          >
            {forumData.map(
              (data, index) =>
                index != 0 && (
                  <option value={data.name} key={index}>
                    {data.name}
                  </option>
                )
            )}
          </select>
          <input
            type="number"
            name="celular"
            {...register("celular")}
            placeholder="Telefone Celular"
            required
            className="cdu-campos"
            defaultValue={usuarioSelecionado?.celular}
          />
          <input
            type="text"
            name="email"
            {...register("email")}
            placeholder="Email"
            required
            className="cdu-campos"
            defaultValue={usuarioSelecionado?.email}
          />
          <input
            type="text"
            name="senha"
            {...register("senha")}
            placeholder="Senha"
            required
            className="cdu-campos"
          />
        </div>
        <div className="cdu-form-buttons" style={{ justifyContent: "center" }}>
          <button type="submit" className="botao-geral">
            Editar
          </button>
          <button
            className="botao-geral botao-cancelar"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
