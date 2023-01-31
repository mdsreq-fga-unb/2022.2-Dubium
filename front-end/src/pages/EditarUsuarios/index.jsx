import "./style.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { forumData } from "../Forum/Sidebar/data";
import apiRequest from "../../services/api";


export default function EditarUsuario() {
    const { idUsuario } = useParams();
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

        let usuarioEditado = {
            nome_completo: data.nome_completo,
            matricula: data.matricula,
            curso: indexEngenharia,
            celular: data.celular,
            email: data.email,
            senha: data.senha
        };

        await apiRequest
        .put(`usuarios/${idUsuario}`, usuarioEditado)
        .then((response) => {
            alert("Seus dados foram editados com sucesso!");
        })
        .catch((error) => console.log(error));
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit(onSubmit)} className="formulario">
                <div className="group-input">
                    <input
                        type="text"
                        name="nome_completo"
                        {...register("nome_completo")}
                        className="titulo-input"
                        placeholder="Nome Completo"
                        required
                    />
                    <input
                        type="number"
                        name="matricula"
                        {...register("matricula")}
                        className="titulo-input"
                        placeholder="Matrícula"
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
                        type="number"
                        name="celular"
                        {...register("celular")}
                        className="titulo-input"
                        placeholder="Telefone Celular"
                        
                        required
                    />
                    <input
                        type="text"
                        name="email"
                        {...register("email")}
                        className="titulo-input"
                        placeholder="Email"
                        required
                    />
                    <input
                        type="text"
                        name="senha"
                        {...register("senha")}
                        className="titulo-input"
                        placeholder="Senha"
                        required
                    />
                </div>
                <div className="group-input" style={{ justifyContent: "center" }}>
                    <button type="submit" className="botao-geral">
                        Enviar
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