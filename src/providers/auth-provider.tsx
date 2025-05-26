import React, { createContext, useContext } from "react";
import { useAuthStore } from "@/store/useAuthStore";

const AuthContext = createContext({
  user: {},
  setUser: ({}) => {},
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = React.useState({});

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, useAuthStore, AuthContext, AuthProvider };
