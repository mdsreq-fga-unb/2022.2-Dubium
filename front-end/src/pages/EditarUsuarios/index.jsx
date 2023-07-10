import "./style.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { forumData } from "../Forum/Sidebar/data";
import apiRequest from "../../services/api";
import { useEffect } from "react";
import { useState } from "react";
import InputMask from "react-input-mask";
import jwt from 'jwt-decode' 

export default function EditarUsuario() {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
  const [token, setToken] = useState('');
  const { idUsuario } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
  }, [])

  const getUsuario = () => {
    apiRequest
    .get(`/usuario/${idUsuario}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((response) => {
      setUsuarioSelecionado(response.data);
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro" + err);
    });
  }

  useEffect(() => {
    if(token){
      getUsuario()
    }
  }, [token]);

  function formatPhoneNumber(phoneNumber) {
    const formattedPhoneNumber = phoneNumber
      .replace(/[^0-9]/g, "")
      .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

    return formattedPhoneNumber;
  }

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
      nome_completo: data.nome_completo || usuarioSelecionado?.nome_completo,
      matricula: data.matricula || usuarioSelecionado?.matricula,
      curso: indexEngenharia || usuarioSelecionado?.curso,
      celular: data.celular || usuarioSelecionado?.celular,
      email: data.email || usuarioSelecionado?.email,
      password: data.senha || usuarioSelecionado?.senha,
    };

    await apiRequest
      .post(`/usuario/editar/${idUsuario}`, usuarioEditado, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        alert("Seus dados foram editados com sucesso!");
      })
      .catch((error) => console.log(error));

    navigate(-1);
  };

  return (
    <div className="container" style={{ marginLeft: "-301px" }}>
      <div className="editar-usuario">
        <form action="" onSubmit={handleSubmit(onSubmit)} className="eu-form">
          <div className="eu-form-campos">
            <div className="grupo-x">
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
                defaultValue={usuarioSelecionado?.curso}
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
              <input
                type="tel"
                name="celular"
                {...register("celular")}
                placeholder="Telefone Celular"
                required
                className="cdu-campos"
                defaultValue={
                  usuarioSelecionado?.celular &&
                  formatPhoneNumber(usuarioSelecionado?.celular)
                }
              />
              <input
                type="email"
                name="email"
                {...register("email")}
                placeholder="Email"
                required
                className="cdu-campos"
                defaultValue={usuarioSelecionado.email}
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
          <div
            className="cdu-form-buttons"
            style={{ justifyContent: "center" }}
          >
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
    </div>
  );
}
