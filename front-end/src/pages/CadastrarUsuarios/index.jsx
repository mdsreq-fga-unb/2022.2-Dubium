import "./style.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { forumData } from "../Forum/Sidebar/data";
import apiRequest from "../../services/api";
import InputMask from "react-input-mask";
import logo from "../../assets/images/lgLetraBranca.png";

export default function CadastrarUsuarios() {
  const navigate = useNavigate();

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

    let novoUsuario = {
      nome_completo: data.nome_completo,
      curso: indexEngenharia,
      matricula: data.matricula,
      email: data.email,
      celular: data.celular,
      password: data.senha,
    };

    await apiRequest
      .post("/cadastro", novoUsuario)
      .then((response) => {
        console.log(response)
        alert("Usuário cadastrado com sucesso!");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        alert("Falha ao cadastrar o usuário!");
      });
  };

  return (
    <div className="cadastrar-usuario">
      <form action="" onSubmit={handleSubmit(onSubmit)} className="cdu-form">
        <div className="cdu-form-campos">

          <div id="logoCadastro">
            <img src={logo} alt="logo" className="logo" />
          </div>

          <div className="grupo-x">
            <input
              type="text"
              name="nome_completo"
              {...register("nome_completo")}
              placeholder="Nome Completo"
              required
              className="cdu-campos"
            />
            <InputMask
              name="matricula"
              {...register("matricula")}
              placeholder="Matrícula"
              required
              className="cdu-campos"
              mask="999999999"
            />
            <select
              name="engenharia"
              {...register("engenharia")}
              required
              className="cdu-campos"
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
          </div>
          <div className="grupo-x">
            <InputMask
              name="celular"
              {...register("celular")}
              placeholder="Telefone Celular"
              required
              className="cdu-campos"
              mask="(99)99999-9999"
            />
            <input
              type="email"
              name="email"
              {...register("email")}
              placeholder="Email"
              required
              className="cdu-campos"
            />
            <input
              type="password"
              name="senha"
              {...register("senha")}
              placeholder="Senha"
              required
              className="cdu-campos"
            />
          </div>
        </div>
        <div className="cdu-form-buttons">
          <button type="submit" className="botao-geral">
            Cadastrar
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
