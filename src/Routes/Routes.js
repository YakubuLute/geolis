import Header from "../component/shared/Header";
import Footer from "../component/shared/Footer";
import Home from "../Pages/Home";
import PageNotFound from "../component/shared/404";
import {ContactPage} from "../Pages/Home/Menu/Contact";
import Dashboard from "../Pages/Dashboard";
import AuthPage from "../component/Auth/index";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState } from "react";

import LandListing from "../Pages/Home/Menu/landlisting/LandListing"
import Faqs from "../Pages/Home/Menu/Faqs/faqs";
import { ForgotPassword } from "../component/Auth/resetpassword";
import LandDetails from "../Pages/Home/Menu/LandDetails";


const RouterComponent = () => {
  const [currentUrl, setCurrentUrl] = useState(window.location.pathname);

  return (
    <>
      {/* Generally we will want to render Header and Footer on all pages except auth page */}
      <BrowserRouter>
        {currentUrl.includes("/auth") ? <></> : <Header />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/reset-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/land-listing" element={<LandListing />} />
          <Route path="/landdetails/:id" element={<LandDetails />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {currentUrl.includes("/auth") ? <></> : <Footer />}
      </BrowserRouter>
    </>
  );
};

export default RouterComponent;
