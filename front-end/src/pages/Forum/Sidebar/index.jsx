import "./style.css";
import { forumData } from "./data";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import SidebarContext from "../../../context/SidebarProvider";

const Sidebar = (props) => {
  const [isActive, setIsActive] = useState(0);
  const { setElementoSidebar } = useContext(SidebarContext);

  return (
    <ul className="sidebar-forum">
      {forumData.map((data, index) => (
        <li
          className={
            isActive === index ? "item-sidebar is-active" : "item-sidebar"
          }
          key={index}
          onClick={() => {
            setIsActive(index);
            props.setIsPerguntaOpen(false);
            props.setIsFormOpen(false);
            setElementoSidebar(index);
          }}
        >
          {data.icon}
          <Link to="/">{data.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
