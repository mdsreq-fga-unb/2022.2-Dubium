import "./style.css";
import { forumData } from "./data";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <ul className="sidebarforum">
      {forumData.map((data, index) => (
        <li className="engenharias" key={index}>
          <Link to="/">{data.name}</Link>{" "}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
