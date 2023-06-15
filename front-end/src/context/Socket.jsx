import socketio from "socket.io-client";

import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const socket = socketio.connect("http://localhost:8080");
export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  useEffect(() => {
    // Lógica de conexão do socket
    socket.connect();

    return () => {
      // Lógica de desconexão do socket, se necessário
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
