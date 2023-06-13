import "./style.css";

import SidebarChatPublico from "../ChatPublico/SidebarChat/index.jsx";
import ChatPrincipal from "../ChatPublico/ChatPrincipal/index.jsx"
import Header from "../../components/header";
import SocketProvider from '../../context/Socket'

export default function ChatPublico() {
    return (
        <div className="containerChat">
            <SocketProvider>
                <Header/>
            </SocketProvider>

            <div className="sidebar-Chat">
                <SidebarChatPublico/>
            </div>
            <div className="chat-principal">
                <ChatPrincipal/>
            </div>
        </div>
    );
}