import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./style.css";

export default function ForumLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}
