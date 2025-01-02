import React from 'react'
import { Navigate } from 'react-router-dom';
function PrivateRoute({ children, userData }) {

  if (!userData?.id) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default PrivateRoute