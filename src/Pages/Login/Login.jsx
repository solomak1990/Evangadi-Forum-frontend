import React, { useState } from 'react';
import styles from './login.module.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../axiosConfig';
import Layout from '../../component/Layout/Layout'; 
import { setToken } from "../../utils/tokenHelper";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setErrorMsg('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('api/user/login', formData);

      if (response.data.message === 'User login successful') {
        // Use the token helper to set token consistently
        setToken(response.data.token);
        console.log('Login successful, token stored');
        
        // Navigate to home after successful login
        navigate('/home'); 
      } else {
        setErrorMsg(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg(error.response?.data?.message || 'Invalid credentials or server error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout> 
      <div className={styles.pageWrapper}>
        <div className={styles.loginPageContainer}>
          <div className={styles.blueShape}></div>

          <div className={styles.loginLeft}>
            <div className={styles.loginBox}>
              <h2 className={styles.loginHeading}>Login to your account</h2>
              <p>
                Don't have an account? <Link to="/register">Create a new account</Link>
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="email"
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="current-password"
                />

                <div className={styles.loginFooter}>
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>

                {errorMsg && <p className={styles.error}>{errorMsg}</p>}

                <button 
                  type="submit" 
                  className={styles.loginButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          </div>

          <div className={styles.loginRight}>
            <div className={styles.aboutSection}>
              <h4 className={styles.aboutTitle}>About</h4>
              <h2 className={styles.aboutHeading}>Evangadi Networks</h2>
              <p className={styles.aboutText}>
                No matter what stage of life you are in, whether you're just starting elementary school or
                being promoted to CEO of a Fortune 500 company, you have much to offer to those who are
                trying to follow in your footsteps.
              </p>
              <p className={styles.aboutText}>
                Whether you are willing to share your knowledge or you are just looking to meet mentors of
                your own, please start by joining the network here.
              </p>
              <button className={styles.aboutButton}>HOW IT WORKS</button>
            </div>
            <div className={styles.pinkShape}></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;