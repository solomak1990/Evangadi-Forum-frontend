import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../component/Layout/Layout'; 

const Login = () => {
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.email || !formData.password) {
      setErrorMsg('Please fill in all fields');
      return;
    }

    try {
      
      const response = await axios.post('https://your-api.com/api/login', formData);

      if (response.data.success) {
        
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); 
      } else {
        setErrorMsg(response.data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMsg('Invalid credentials or server error');
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
                Don’t have an account? <a href="/register">Create a new account</a>
              </p>

              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />

                <div className={styles.loginFooter}>
                  <a href="/forgot-password">Forgot password?</a>
                </div>

                {errorMsg && <p className={styles.error}>{errorMsg}</p>}

                <button type="submit" className={styles.loginButton}>
                  Login
                </button>
              </form>
            </div>
          </div>

          <div className={styles.loginRight}>
            <div className={styles.aboutSection}>
              <h4 className={styles.aboutTitle}>About</h4>
              <h2 className={styles.aboutHeading}>Evangadi Networks</h2>
              <p className={styles.aboutText}>
                No matter what stage of life you are in, whether you’re just starting elementary school or
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
