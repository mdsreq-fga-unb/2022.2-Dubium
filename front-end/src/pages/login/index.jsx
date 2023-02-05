import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import apiRequest from "../../services/api";
import "./style.css";

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function parseJwt(token) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const getUser = async () => {
    const token = localStorage.getItem("token");
    const id = parseJwt(token).sub;
    const user = await apiRequest.get(`usuarios/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // console.log(user.data);
    setUser(user.data);
  };

  const onSubmit = async (data) => {
    let user = {
      username: data.email,
      password: data.senha,
    };

    await apiRequest
      .post("usuarios/login", user)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        getUser();
        // navigate("/");
      })
      .catch((response) => {
        console.log(response);
        alert("Email ou senha incorreta!");
      });
  };

  // console.log("teste" + user);
  console.log(user);

  return (
    <div className="caixa">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <input type="email" name="email" {...register("email")} />
        <input type="password" name="senha" {...register("senha")} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
