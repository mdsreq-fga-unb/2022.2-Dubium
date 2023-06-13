import "./style.css";

import SidebarChat from "../Chat/SidebarChat/index.jsx";
import ChatPrincipal from "../Chat/ChatPrincipal/index.jsx";
import SocketProvider from '../../context/Socket'

export default function Chat() {
    return (
        <div className="containerChat">
            <div className="sidebar-Chat">
                <SocketProvider>
                    <SidebarChat>
                    </SidebarChat>
                </SocketProvider>
            </div>
            <div className="chat-principal">
                <SocketProvider>
                    <ChatPrincipal>
                    </ChatPrincipal>
                </SocketProvider>
            </div>
        </div>
    );
}
