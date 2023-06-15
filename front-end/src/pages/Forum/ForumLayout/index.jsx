import "./style.css";

import Sidebar from "../Sidebar";

import { Outlet } from "react-router-dom";
import isAuthenticated from "../../../isAuth";

export default function ForumLayout({ pagina }) {
    return (
      <>
        <Sidebar pagina={pagina} />
        <Outlet />
      </>
    );
}
