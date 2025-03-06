import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {useAuth} from '../../context/AuthContext'

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");

     const { login } = useAuth();
     const navigate = useNavigate();


    const handleChange = (e) => {
      const { name, value} = e.target;
        setFormData(prev => ({...prev,[name]: value}));
    };

 const handleSubmit = async (e) => {
   e.preventDefault();
   setError("");
   setLoading(true);

   try {
     // Make sure you're calling login with formData.email and formData.password
     await login(formData.email, formData.password);
     navigate("/dashboard");
   } catch (err) {
     console.error("Login error:", err);
     setError(err.response?.data?.message || "Login failed");
   } finally {
     setLoading(false);
   }
 };
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="login-form">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            <div className="text-sm text-center">
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Don&apos;t have an account? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
}

export default LoginForm;