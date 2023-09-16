import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import PasswordReset from "./pages/PasswordReset";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/request-password-reset"
                    element={<RequestPasswordReset />}
                />
                <Route path="/passwordReset" element={<PasswordReset />} />
            </Routes>
        </div>
    );
}

export default App;
