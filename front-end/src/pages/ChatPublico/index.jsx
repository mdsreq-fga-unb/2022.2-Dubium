import "./style.css";

import Header from "../../components/header/index.jsx"
import SidebarSalasPublico from "../SalasPublico/SidebarSala//index.jsx";

import SalasPublicas from "../SalasPublico/SalaPrincipal/index.jsx";


export default function ChatPublico() {
    return (
        <div className="containerChat">

            <Header/>
            <div className="containerSidebar">
                <SidebarSalasPublico/>
            </div>
            <div className="chatPrincipal">
                <SalasPublicas/>
            </div>
        </div>
    );
    }