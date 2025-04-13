import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import AuthProvider from "../../Auth/AuthProvider";
import ArrayBuilderModal from "../../components/AlgoritmTester/ArrayBuilderModal";
import { useAlgorithm } from "../../Services/AlgorithmProvider";

const Layout = () => {
  return (
    <section className="flex flex-col justify-between min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
      <ArrayBuilderModal />
    </section>
  );
};

export default Layout;
