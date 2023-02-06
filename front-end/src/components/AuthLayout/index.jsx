import "./style.css";

import { Outlet } from "react-router-dom";
import Footer from "../footer";
import Header from "../header";

export default function AuthLayout({ setMateriaPesquisada }) {
  return (
    <div className="auth-layout">
      <Header setMateriaPesquisada={setMateriaPesquisada} />
      <Outlet />
      <Footer />
    </div>
  );
}
