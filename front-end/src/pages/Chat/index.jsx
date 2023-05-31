import "./style.css";

import SidebarChat from "../Chat/SidebarChat/index.jsx";
import ChatPrincipal from "../Chat/ChatPrincipal/index.jsx";


export default function Chat() {
    return (
        <div className="containerChat">
            <div className="sidebar-Chat">
                <SidebarChat>
                </SidebarChat>
            </div>
            <div className="chat-principal">
                <ChatPrincipal>
                </ChatPrincipal>
            </div>
        </div>
    );
}
