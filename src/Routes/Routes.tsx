import React, {useState, useEffect} from 'react';
import Header from "../component/shared/Header/index.jsx";
import Footer from "../component/shared/Footer/index.jsx";
import Home from "../Pages/Home/index.jsx";
import PageNotFound from "../component/shared/404/index.jsx";
import {ContactPage} from "../Pages/Home/Menu/Contact/index.jsx";
import Dashboard from "../Pages/Dashboard/index.jsx";
import AuthPage from "../component/Auth/index";
import { Route, Routes, BrowserRouter } from "react-router-dom";


import LandListing from "../Pages/Home/Menu/landlisting/LandListing.jsx"
import Faqs from "../Pages/Home/Menu/Faqs/faqs.jsx";
import { ForgotPassword } from "../component/Auth/resetpassword.jsx";
import LandDetails from "../Pages/Home/Menu/LandDetails/index.tsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { useFireStoreContext } from '../context/FireStoreContext.js';


const RouterComponent = () => {
const [currentUrl] = useState(window.location.pathname);
const {userData, userProfile, isUserDataLoading} = useFireStoreContext();  
if(isUserDataLoading){
  return <div>Please wait. Loading...</div>;
 
}  
  return (
    <>
      <BrowserRouter>
        {(currentUrl.includes("/auth")|| currentUrl.includes("/dashboard")) ? <></> : <Header />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/reset-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route 
        
            path="/dashboard" 
            element={
              <PrivateRoute   
              userData= {userData}
              >
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route path="/land-listing" element={<LandListing />} />
          <Route path="/land/details/:id" element={<LandDetails />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {(currentUrl.includes("/auth")|| currentUrl.includes("/dashboard")) ? <></> : <Footer />}
      </BrowserRouter>
    </>
  );
};

export default RouterComponent;
