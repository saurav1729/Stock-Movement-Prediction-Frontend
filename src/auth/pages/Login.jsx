import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../css/auth.module.css';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5500/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, password }),
      });

      const data = await response.json();

      if (response.ok) {

        const user ={
          full_name : data.data.full_name, 
          user_id:data.data.user_id, 
          email:data.data.email
        }
        authCtx.login(
          data.data.token, 
          user, 
          9600000
        )
        navigate('/');
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Welcome Back</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="user_id">User ID</label>
            <input
              type="text"
              id="user_id"
              value={user_id}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your user ID"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className={styles.switchPrompt}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <Link to="/forgot-password" className={styles.forgotPassword}>
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default Login;

