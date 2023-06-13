import "./style.css";

import { Outlet } from "react-router-dom";
import Header from "../header";
import SocketProvider from '../../context/Socket'

export default function AuthLayout({ setMateriaPesquisada }) {
  return (
    <div className="auth-layout">
      <SocketProvider>
        <Header setMateriaPesquisada={setMateriaPesquisada} />
      </SocketProvider>
      <Outlet />
    </div>
  );
}
