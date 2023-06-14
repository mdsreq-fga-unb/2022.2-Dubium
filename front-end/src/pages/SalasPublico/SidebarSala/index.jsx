import "./style.css";

import { Link } from "react-router-dom";

export default function SidebarSalaPublico() {
  return (

    <div className="containerSidebar">

      <div className="criarSalaBotao">
        <Link to={"/criarSala"}>
          <span>Criar Sala +</span>
        </Link>
      </div>
    </div>
  );
}