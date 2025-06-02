import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Index from "./routes/Index";
import TestaAlgoritm from "./routes/TestaAlgoritm";
import Laroportal from "./routes/Laroportal";
import AboutUs from "./routes/About us/AboutUs";
import Layout from "./Layout/Layout";
import Loginpage from "./routes/Login page/Loginpage";
import AuthProvider from "../Auth/AuthProvider";
import Editpage from "./routes/Editpage";
import Logout from "./routes/Logout";
import SelectedText from "../components/SelectedText/SelectedText";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminCreateArticle from "../components/AdminPage/AdminCreateArticle";
import AdminManageArticles from "../components/AdminPage/AdminManageArticles";
import AdminOverlook from "../components/AdminPage/AdminOverlook";
import AdminPage from "../components/AdminPage/AdminPage";

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="laroportal" element={<Laroportal />} />
            <Route path="/laroportal/article/:id" element={<SelectedText />} />
            <Route path="/testa-algoritm" element={<TestaAlgoritm />} />
            <Route
              path="/testa-algoritm/:algorithm"
              element={<TestaAlgoritm />}
            />

            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            >
              <Route path="overlook" element={<AdminOverlook />} />
              <Route path="manage" element={<AdminManageArticles />} />
              <Route path="create" element={<AdminCreateArticle />} />
              <Route index element={<Navigate to={"overlook"} />} />
            </Route>
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="*" element={<div>error 404</div>} />
          </Route>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<div>Error 404 page not found</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Router;
