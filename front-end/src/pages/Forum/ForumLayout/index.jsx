import "./style.css";

import Sidebar from "../Sidebar";

import { Outlet } from "react-router-dom";

export default function ForumLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
