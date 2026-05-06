import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    // Si non connecté, redirection vers login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Si connecté mais n'a pas le bon rôle, redirection vers son espace
    if (user.role === 'client') return <Navigate to="/client" replace />;
    if (user.role === 'agent') return <Navigate to="/agent" replace />;
    if (user.role === 'admin') return <Navigate to="/admin" replace />;
  }

  // Si tout est ok, afficher la route
  return <Outlet />;
}
