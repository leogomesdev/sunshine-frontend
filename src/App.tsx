import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthProvider from "./auth/AuthProvider";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoute from "./routes/PrivateRoute";
import Register from "./components/Register";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
