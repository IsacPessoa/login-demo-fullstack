import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import AdminSuccess from "./pages/AdminSuccess";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/success" element={<Success />} />
                <Route path="/admin/success" element={<AdminSuccess />} />
            </Routes>
        </BrowserRouter>
    );
}
