import "./style.css";
import { forumData } from "./data";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <ul className="sidebarforum">
      {forumData.map((data, index) => (
        <Link to="/">
          <li className="engenharias">{data.name} </li>
        </Link>
      ))}
    </ul>
  );
};

export default Sidebar;
