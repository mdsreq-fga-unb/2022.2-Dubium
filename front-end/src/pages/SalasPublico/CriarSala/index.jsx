import "./style.css";

import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import Header from "../../../components/header";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";


export default function CriarSala() {

    const [selectedImage, setSelectedImage] = useState(null);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="containerCriarSala">
            <Header />
            <div className="criarSala">


                <form action="criandoSala">

                    <input className="campoEntrada" type="text" placeholder="Nome da Sala" required />

                    <input className="campoEntrada" type="text" placeholder="Tema da Sala" required />

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

                    </div>

                </form>




            </div>
        </div>
    );
}