import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import AuthProvider from "../../Auth/AuthProvider";

const Layout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      {/* {children} */}

      <Footer />
    </section>
  );
};

export default Layout;
