import "./style.css";
import { forumData } from "./data";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

import SidebarContext from "../../../context/SidebarProvider";
import apiRequest from "../../../services/api";

const Sidebar = ({ pagina }) => {
  const [isActive, setIsActive] = useState(0);
  const { setElementoSidebar } = useContext(SidebarContext);
  const { elementoSidebar } = useContext(SidebarContext);

  return (
    <div>
      <ul className="sidebar-forum">
        {forumData.map((data, index) => (
          <li key={index}>
            <Link
              className={
                isActive === index ? "item-sidebar is-active" : "item-sidebar"
              }
              to={pagina == "forum" ? data.pathPergunta : data.pathAvisos}
              onClick={() => {
                setIsActive(index);
                setElementoSidebar(index);
              }}
            >
              {data.icon}
              {data.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="navRight">
        <div><Link className="buttonChat" to="/chat">Acessar o Chat</Link></div>
      </ul>
    </div>
  );
};

export default Sidebar;
