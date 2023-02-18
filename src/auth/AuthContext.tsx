import React, { createContext, useState } from "react";

type AuthContextType = {
  authenticated: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  handleLogin: () => {},
  handleLogout: () => {},
});

interface Props {
  children: React.ReactNode;
}

// export const AppContext = React.createContext<AppContextType | null>(null);

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ authenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
