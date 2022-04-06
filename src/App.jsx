import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import MainProfile from "./Pages/MainProfile/MainProfile";
import AuthProvider from "./Helper/Context";
import CreateCard from "./Pages/CreateCard/CreateCard";
import YourCard from "./Pages/YourCard/YourCard";
import ScanCard from "./Pages/ScanCard/ScanCard";
import WriteCard from "./Pages/WriteCard/WriteCard";
import SavedCard from "./Pages/SavedCard/SavedCard";
import CardProfile from "./Pages/CardProfile/CardProfile";
import BusinessCard from "./Pages/BusinessCard/BusinessCard";
import ResetPwd from "./Pages/ResetPassword/ResetPwd";
import Update from "./Pages/UpdateProfile/UpdateProfile";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-pwd" element={<ResetPwd />} />
          <Route path="/profile/:id" element={<BusinessCard />} />

          {/* private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<MainProfile />} />
            <Route path="/update-profile" element={<Update />} />
            <Route path="/create-card" element={<CreateCard />} />
            <Route path="/card" element={<YourCard />} />
            <Route path="/card/:id" element={<CardProfile />} />
            <Route path="/scan-card" element={<ScanCard />} />
            <Route path="/write-card" element={<WriteCard />} />
            <Route path="/saved-cards" element={<SavedCard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
