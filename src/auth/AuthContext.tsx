import { createContext } from "react";

type AuthContextType = {
  authenticated: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  handleLogin: () => {},
  handleLogout: () => {},
});

export default AuthContext;
