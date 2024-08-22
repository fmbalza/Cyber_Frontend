import Navbar from "./components/navbar/Navbar";
import Cuadro from "./components/pulseras/pulseras";
import Sidebar from "./components/sidebar/Sidebar";
import { Grid } from "@mui/joy";
import { styled } from "@mui/material";
import "./App.css";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
            <Route index path="/" element={<Login/>} />
            <Route  path="/main" element={<Main/>} />
            <Route  path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
