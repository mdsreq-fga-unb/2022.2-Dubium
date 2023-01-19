import "./style.css";
import { forumData } from "./data";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

import SidebarContext from "../../../context/SidebarProvider";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(0);
  const { setElementoSidebar } = useContext(SidebarContext);

  return (
    <ul className="sidebar-forum">
      {forumData.map((data, index) => (
        <li key={index}>
          <Link
            className={
              isActive === index ? "item-sidebar is-active" : "item-sidebar"
            }
            to={data.path}
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
  );
};

export default Sidebar;
