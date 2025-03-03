import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./routes/Index";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import TestaAlgoritm from "./routes/TestaAlgoritm";
import Laroportal from "./routes/Laroportal";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Index />} />
        <Route path="/laroportal" element={<Laroportal />} />
        <Route path="/laroportal/:id" element={<div>specific id</div>} />
        <Route path="/testa-algoritm" element={<TestaAlgoritm />} />
        <Route path="*" element={<div>error 404</div>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
