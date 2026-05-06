import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from './storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = storage.getCurrentUser();
      if (currentUser) {
        // Refresh user data from local storage to ensure consistency
        const userData = await storage.getUser(currentUser.uid);
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const login = async (phone, password) => {
    try {
      const userData = await storage.login(phone, password);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: error.message || 'Erreur lors de la connexion' };
    }
  };

  const signup = async (name, phone, password, location, address) => {
    try {
      const userData = await storage.signup(name, phone, password, location, address);
      setUser(userData);
      return { success: true, user: userData };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: error.message || "Erreur lors de l'inscription" };
    }
  };

  const logout = async () => {
    try {
      await storage.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const createAgent = async (name, phone, password) => {
    try {
      await storage.createAgent(name, phone, password);
      return { success: true };
    } catch (error) {
      console.error("Create agent error:", error);
      return { success: false, error: error.message || "Erreur lors de la création de l'agent" };
    }
  };

  const getAgents = async () => {
    try {
      return await storage.getAgents();
    } catch (error) {
      console.error("Get agents error:", error);
      return [];
    }
  };

  const getAdmins = async () => {
    try {
      return await storage.getAdmins();
    } catch (error) {
      console.error("Get admins error:", error);
      return [];
    }
  };

  const createAdminAccount = async (name, phone, password) => {
    try {
      await storage.createAdmin(name, phone, password);
      return { success: true };
    } catch (error) {
      console.error("Create admin error:", error);
      return { success: false, error: error.message || "Erreur lors de la création de l'admin" };
    }
  };

  const updateUser = async (data) => {
    if (!user) return;
    try {
      const updatedUser = await storage.updateUser(user.uid, data);
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error("Update user error:", error);
      return { success: false, error: error.message };
    }
  };

  const createTask = async (agentId, clientId, zone, date) => {
    try {
      await storage.createTask(agentId, clientId, zone, date);
      return { success: true };
    } catch (error) {
      console.error("Create task error:", error);
      return { success: false, error: error.message };
    }
  };

  const getTasks = async () => {
    try {
      return await storage.getTasks();
    } catch (error) {
      console.error("Get tasks error:", error);
      return [];
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await storage.updateTaskStatus(taskId, status);
      return { success: true };
    } catch (error) {
      console.error("Update task status error:", error);
      return { success: false, error: error.message };
    }
  };

  const getClients = async () => {
    try {
      return await storage.getClients();
    } catch (error) {
      console.error("Get clients error:", error);
      return [];
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, loading, login, signup, logout, 
      createAgent, getAgents, getAdmins, createAdminAccount, 
      updateUser, createTask, getTasks, updateTaskStatus, getClients 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}





export const useAuth = () => useContext(AuthContext);

