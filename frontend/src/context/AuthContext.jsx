import {createContext, useState, useEffect, useContext} from 'react';
import {authService} from '../services/authService';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children}) {
    const [ currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token' );

           if (token) {
      // Try to get user profile
      authService.getUserProfile()
        .then(response => {
          setCurrentUser(response.data);
        })
        .catch(err => {
          // If token is invalid, clear it
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [])

 const login = async (email, password) => {
   try {
     setError("");
     console.log("Attempting login with:", { email });
     const response = await authService.login(email, password);
     console.log("Login response:", response.data);
     localStorage.setItem("token", response.data.token);
     setCurrentUser(response.data.user);
     return response.data;
   } catch (err) {
     console.error("Login error in AuthContext:", err);
     setError(err.response?.data?.message || "Failed to login");
     throw err;
   }
 };

  const register = async (userData) => {
    try {
        setError('');
        console.log('Attempting to register with:',{ userData});
        const response = await authService.register(userData);
        console.log('Register response:', response.data);
        return response.data;
    } catch (err){
      console.error("Registration error in AuthContext:", err);
        setError(err.reponse?.data?.message || ' Failed to register');
        throw err;
    }
  };

  const logout =() => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};