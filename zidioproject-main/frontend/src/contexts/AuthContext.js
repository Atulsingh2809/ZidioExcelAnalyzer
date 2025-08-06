import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials, logout as reduxLogout } from '../redux/authSlice';
import API from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
  };

  const register = async (name, email, password, role) => {
    const res = await API.post('/auth/register', { name, email, password, role });
    dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
  };

  const logout = () => {
    dispatch(reduxLogout());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 