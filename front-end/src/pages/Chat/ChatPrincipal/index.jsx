import "./style.css";

import imagemPerfil from "../../../assets/images/logo.jpg";
import SearchIcon from "@mui/icons-material/Search";

export default function ChatPrincipal() {


  return (
    <div className="containerChat">
      <div className="chat-principal">


        <div id="corFundo">

          <div className="dadosUsuario">
            <img id="imagemPerfilChat" src={imagemPerfil} alt="imagemPerfil" />
            Dados Pessoais

            <div id="searchIcon"><SearchIcon /></div>
          </div>

          <div className="textoChatOutro">
            Testando a digitação no chat
            fasfafasf
            fasfafasffasfasfs
            fasfafasffasfasfsfasfsafsa
            fasf
            asf
            asds
            fasfafasffasfasfsfasfsafsafasfa
          </div>

          <div className="conteudoChat">
            <div className="textoChatUser">
              Testando a digitação no chat
              fasfafasf
              fasfafasffasfasfs
              fasfafasffasfasfsfasfsafsa
              fasf
              asf
              asds
              fasfafasffasfasfsfasfsafsafasfa
            </div>

          </div>

        </div >

        <div className="entradasChat">
          <input id="campoDigitacao" type="text" placeholder="Mensagem" />
        </div>

      </div>
    </div>
  );
}
