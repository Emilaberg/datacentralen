import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./routes/Index";
import TestaAlgoritm from "./routes/TestaAlgoritm";
import Laroportal from "./routes/Laroportal";
import AuthProvider from "../Auth/AuthProvider";
import AboutUs from "./routes/About us/AboutUs";
import Layout from "./Layout/Layout";

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <Navbar/> */}
        <Layout>
          <Routes >
              <Route index element={<Index/>}/>
              <Route path='laroportal' element={<Laroportal/>}/>
              <Route path="/laroportal/:id" element={<div>specific id</div>}/> 
              <Route path="/testa-algoritm" element={<TestaAlgoritm />} />
              <Route path='/about-us' element={<AboutUs/>}/>

              <Route path='*' element={<div>error 404</div>}/>
          </Routes>
        </Layout>
        
        {/* <Footer/> */}
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Router;
