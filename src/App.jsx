import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import MainProfile from "./Pages/MainProfile/MainProfile";
import AuthProvider from "./Helper/Context";
import CreateCard from "./Pages/CreateCard/CreateCard";
import YourCard from "./Pages/YourCard/YourCard";
import ScanCard from "./Pages/ScanCard/ScanCard";
import ReceiveCard from "./Pages/ReceiveCard/ReceiveCard";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<MainProfile />} />
          <Route path="/create-card" element={<CreateCard />} />
          <Route path="/card/:id" element={<YourCard />} />
          <Route path="/send-card" element={<ScanCard />} />
          <Route path="/receive-card" element={<ReceiveCard />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
