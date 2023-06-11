import "./style.css";

import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import Header from "../../../components/header";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import jwt from 'jwt-decode';
import apiRequest from "../../../services/api";



export default function CriarSala() {
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const [urlImage, setUrlImage] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setToken(document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1'))
      }, [])


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
            setUrlImage('https://mundoconectado.com.br/uploads/chamadas/dall-e-chamada.jpg')
        }
    };


    const onSubmit = async (form) => {
        const data = {
            privado: false,
            nome: form.nomeSala,
            tema: form.temaSala,
            userAdmin: { id: jwt(token).secret.id, nome: jwt(token).secret.nome },
            foto: urlImage
        }
        await apiRequest
            .post("/chat/chatPublico", data, {
                headers: {
                    Authorization: "bearer " + token
                }
            })
            .then(response => {
                navigate("/chat");
            })
            .catch(err => {console.log(err)})
    }

    return token && (
        <div className="containerCriarSala">
            <Header />
            <div className="criarSala">
                <form action=""  onSubmit={handleSubmit(onSubmit)} className="cdu-form">

                    <input className="campoEntrada" type="text" placeholder="Nome da Sala" name="nomeSala" required {...register("nomeSala")}/>

                    <input className="campoEntrada" type="text" placeholder="Tema da Sala" name="temaSala" required {...register("temaSala")} />

                    <div className="selecaoImagem">
                        {<label htmlFor="uploadInput" className="botaoFotoSala">
                            <EditIcon sx={{ fontSize: 16 }} />
                            Editar Imagem
                        </label>}

                        {selectedImage != null ? (
                            <img id="imagemSala" src={selectedImage} alt="Selected" />
                        ) : (
                            <img id="imagemSala" src="background.jpg" alt="Imagem" />
                        )}

                        <input
                            id="uploadInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <button type="submit" className="botao-geral">
                        Enviar
                        </button>
                    </div>
                </form>




            </div>
        </div>
    );
}