import "./style.css";

import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import Header from "../../../components/header";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import jwt from 'jwt-decode';
import apiRequest from "../../../services/api";



export default function CriarSala({onClick}) {
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const [urlImage, setUrlImage] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

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

const iconSairDiv = {
  margin: '2rem',
  cursor: 'pointer',
  color: 'black',
  width: '1%',
  height: '1%',
  display: 'flex',
  alignText: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '15px',
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
            .catch(err => { console.log(err) })

        navigate('/chat');
        onClick();
    
    }

    const containerCriarSala = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f1f1f1',
        padding: '8rem',
        borderRadius: '5px',
        boxShadow: '0px 5px 10px 2px rgb(162, 161, 161)',
    };

    return token && (
        <div className="containerCriarSala" style={containerCriarSala}>
            <form action="" onSubmit={handleSubmit(onSubmit)}>

                <input className="campoEntrada" type="text" placeholder="Nome da Sala" name="nomeSala" required {...register("nomeSala")} />

                <input className="campoEntrada" type="text" placeholder="Tema da Sala" name="temaSala" required {...register("temaSala")} />

                <div className="selecaoImagem">
                    {/* {<label htmlFor="uploadInput" className="botaoFotoSala">
                            <EditIcon sx={{ fontSize: 16 }} />
                            Imagem da sala
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
                        />*/}
                    <button type="submit" className="botao-geral">
                            Enviar
                    </button>

                </div>
            </form>
        </div>
    );
};