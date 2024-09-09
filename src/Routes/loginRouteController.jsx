import React from 'react';
import { Navigate } from 'react-router-dom';

export const LoginRouterController = ({ user, children }) => {
  return user?.id ? children : <Navigate to="/login" />;
};