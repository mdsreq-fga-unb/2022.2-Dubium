import "./style.css";

import SidebarChatPublico from "../ChatPublico/SidebarChat/index.jsx";
import ChatPrincipal from "../ChatPublico/ChatPrincipal/index.jsx"
import Header from "../../components/header";


export default function ChatPublico() {
    return (
        <div className="containerChat">
            <Header/>
            <div className="sidebar-Chat">
                <SidebarChatPublico/>
            </div>
            <div className="chat-principal">
                <ChatPrincipal/>
            </div>
        </div>
    );
}