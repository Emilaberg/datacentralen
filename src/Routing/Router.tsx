import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./routes/Index";
import TestaAlgoritm from "./routes/TestaAlgoritm";
import Laroportal from "./routes/Laroportal";
import AboutUs from "./routes/About us/AboutUs";
import Layout from "./Layout/Layout";
import Loginpage from "./routes/Login page/Loginpage";
import AuthProvider from "../Auth/AuthProvider";
import Editpage from "./routes/Editpage";
import Navbar from "../components/Navbar/Navbar";

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route index element={<Index />} />
          <Route path="laroportal" element={<Laroportal />} />
          <Route path="/laroportal/:id" element={<div>specific id</div>} />
          <Route path="/testa-algoritm" element={<TestaAlgoritm />} />
          <Route path="/edit" element={<Editpage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<div>error 404</div>} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="*" element={<div>Error 404 page not found</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Router;
