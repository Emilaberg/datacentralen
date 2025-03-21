import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./routes/Index";
import TestaAlgoritm from "./routes/TestaAlgoritm";
import Laroportal from "./routes/Laroportal";
import AboutUs from "./routes/About us/AboutUs";
import Layout from "./Layout/Layout";
import Loginpage from "./routes/Login page/Loginpage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
            <Route index element={<Index/>}/>
            <Route path='laroportal' element={<Laroportal/>}/>
            <Route path="/laroportal/:id" element={<div>specific id</div>}/> 
            <Route path="/testa-algoritm" element={<TestaAlgoritm />} />
            <Route path='/about-us' element={<AboutUs/>}/>

            <Route path='*' element={<div>error 404</div>}/>
        </Route>            
        
        <Route path="/login" element={<Loginpage/>}/>
        <Route path="*" element={<div>Error 404 page not found</div>} />
      
      </Routes>    
    </BrowserRouter>
  );
}

export default Router;
