import "./style.css";
import { Link } from "react-router-dom";

export default function SalasPublicas() {

  return (
    <div className="containerSalaPrincipal">
      <div className="salaPrincipal">

        <div className="divisaoColunaSala">
          <div className="colunaSala">
            <div className="sala">
              <div>Teste</div>

                <div><Link className="botaoChatPublico" to="/chatPublico">Chat</Link></div>

            </div>
          </div>
        </div>

        <div className="divisaoColunaSala2">
          <div className="sala">
            Teste
          </div>
        </div>

        <div className="divisaoColunaSala3">
          <div className="sala">
            Teste
          </div>
        </div>
      </div>
    </div>
  );
}
