import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Project from "./Pages/Project";
import PageNotFound from "./Pages/PageNotFound";
import Auth from "./Pages/Auth"
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Auth/>}/>
        <Route path="/register" element={<Auth register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/project" element={<Project/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
