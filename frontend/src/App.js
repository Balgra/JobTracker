
import './App.css';
import HomePage from "./pages/HomePage";
import  LoginPage  from "./pages/LoginPage";
import  RegisterPage from "./pages/RegisterPage";
import {BrowserRouter, Routes, Route,} from "react-router-dom";
import {render} from "react-dom";
import ProfilePage from "./pages/ProfilePage";


function App() {
  const rootElement = document.getElementById("root");
  return (
  render(
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="Login" element={<LoginPage />} />
            <Route path="Register" element={<RegisterPage />} />
            <Route path="Profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>,
      rootElement
  )
);
}

export default App;
