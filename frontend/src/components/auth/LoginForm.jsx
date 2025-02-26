import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from '../../services/authService';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
          const response = await authService.login(formData);
          localStorage.setItem('token', response.data.token);
          navigate('/dashboard');
        } catch (err) {
          setError(err.response?.data?.message || 'Login failed');
        }
      };
    
    return (
          <div className="login-form">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                        name="email"
                        id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                        name="password"
                        id="password"
                  value={formData.password}
                        onChange={handleChange}
                        required
                />
              </div>
              <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;