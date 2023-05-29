import { createContext, useState } from "react";

const SidebarContext = createContext({});



export const SidebarProvider = ({ children }) => {
  const [elementoSidebar, setElementoSidebar] = useState(0);

  return (
    <SidebarContext.Provider value={{ elementoSidebar, setElementoSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
