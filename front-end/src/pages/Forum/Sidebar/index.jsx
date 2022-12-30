import "./style.css";
import { forumData } from "./data";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = (props) => {
  const [isActive, setIsActive] = useState(0);

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
          }}
        >
          {data.icon}
          <Link to="/">{data.name}</Link>{" "}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
