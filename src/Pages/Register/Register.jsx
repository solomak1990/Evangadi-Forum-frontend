import { useRef, useState } from "react";
import axiosBase from "../../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import styles from "./register.module.css";
import { setToken } from "../../utils/tokenHelper"; // Import the token helper

function Register() {
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = userNameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;
    if (
      !usernameValue ||
      !firstValue ||
      !lastValue ||
      !emailValue ||
      !passValue
    ) {
      alert("Please provide all required information");
      return;
    }

    // Log data for debugging
    console.log("Registration attempt:", {
      username: usernameValue,
      first_name: firstValue,
      last_name: lastValue,
      email: emailValue,
    });

    try {
      await axiosBase.post("api/user/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      
      alert("Registration successful. Please log in.");
      navigate("/login");
    } catch (error) {
      
      const message = error.response?.data?.message || "Something went wrong!";
      alert(message);
      console.error(error);
    }
  }
  return (
    <Layout>
      <section className={styles.registerSection}>
        <div className={styles.registerContainer}>
          <h2 className={styles.registerTitle}>Create Account</h2>
          <p className={styles.registerSubtitle}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          
          <form onSubmit={handleSubmit} className={styles.registerForm}>
            <div className={styles.formGroup}>
              <span className={styles.label}>User Name</span>
              <input 
                ref={userNameDom} 
                type="text" 
                placeholder="User Name" 
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <span className={styles.label}>First Name</span>
              <input
                ref={firstnameDom}
                type="text"
                placeholder="First Name"
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <span className={styles.label}>Last Name</span>
              <input
                ref={lastnameDom}
                type="text"
                placeholder="Last Name"
                className={styles.input}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <span className={styles.label}>Email</span>
              <input 
                ref={emailDom} 
                type="email" 
                placeholder="Email" 
                className={styles.input}
                required 
              />
            </div>
            
            <div className={styles.formGroup}>
              <span className={styles.label}>Password</span>
              <input
                ref={passwordDom}
                type="password"
                placeholder="Password"
                className={styles.input}
                required
              />
            </div>
            
            <button type="submit" className={styles.registerButton}>
              Create Account
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default Register;