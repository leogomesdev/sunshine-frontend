import { useContext } from "react";
import AuthContext from "../auth/AuthContext";

const Home: React.FC = () => {
  const { handleLogout } = useContext(AuthContext);

  return (
    <div>
      <h1>Logged in</h1>
      <p>If you want to see the sunshine, you have to weather the storm</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
