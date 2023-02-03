import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../services/api";
import "./style.css";

export default function Login(){
    
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const onSubmit = (data) => {
        let user={
           username: data.email,
           password: data.senha 
        }
        apiRequest.post('usuarios/login', user)
        .then((response)=>{
            console.log(response)
            navigate('/')
        })
        .catch((response)=>{
            console.log(response)
            alert('Email ou senha incorreta!')
        })
    }
    return(
        <div  className="caixa">
            <form action="" onSubmit={handleSubmit(onSubmit)} >
            <input type="email" name="email"  {...register("email")}/>
            <input type="password" name="senha"  {...register("senha")}/>
            <button type= "submit">Login</button>
            </form>
        </div>
    );

}
