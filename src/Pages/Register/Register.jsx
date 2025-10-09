import { useRef, useState } from "react";
import axiosBase from "../../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import styles from "./register.module.css";
import { setToken } from "../../utils/tokenHelper"; // Import the token helper

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const userNameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const usernameValue = userNameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!usernameValue || !firstValue || !lastValue || !emailValue || !passValue) {
      setErrorMsg("Please provide all required information");
      setIsLoading(false);
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
      const response = await axiosBase.post("api/user/register", {
        username: usernameValue,
        first_name: firstValue,
        last_name: lastValue,
        email: emailValue,
        password: passValue,
      });
      
      console.log("Registration successful:", response.data);
      
      // If your API returns a token on registration (auto-login), use it
      if (response.data.token) {
        setToken(response.data.token);
        alert("Registration successful! You are now logged in.");
        navigate("/home");
      } else {
        alert("Registration successful. Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      // Enhanced error handling
      if (error.response) {
        const status = error.response.status;
        const serverMessage = error.response?.data?.message;
        
        switch (status) {
          case 409:
            setErrorMsg(serverMessage || "User already exists! Please try logging in or use a different email/username.");
            // Clear the form fields that might be duplicates
            if (serverMessage?.toLowerCase().includes('email')) {
              emailDom.current.value = "";
              emailDom.current.focus();
            } else if (serverMessage?.toLowerCase().includes('username')) {
              userNameDom.current.value = "";
              userNameDom.current.focus();
            }
            break;
            
          case 400:
            setErrorMsg(serverMessage || "Invalid data provided. Please check your information and try again.");
            break;
            
          case 401:
            setErrorMsg(serverMessage || "Authentication failed. Please try again.");
            break;
            
          case 500:
            setErrorMsg(serverMessage || "Server error. Please try again later.");
            break;
            
          default:
            setErrorMsg(serverMessage || "Registration failed. Please try again.");
        }
      } else if (error.request) {
        // Network error - no response received
        setErrorMsg("Network error. Please check your internet connection and try again.");
        console.error("Network error:", error.request);
      } else {
        // Other errors
        setErrorMsg("Something went wrong! Please try again.");
        console.error("Error:", error.message);
      }
    } finally {
      setIsLoading(false);
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
                disabled={isLoading}
                autoComplete="username"
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
                disabled={isLoading}
                autoComplete="given-name"
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
                disabled={isLoading}
                autoComplete="family-name"
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
                disabled={isLoading}
                autoComplete="email"
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
                disabled={isLoading}
                autoComplete="new-password"
              />
            </div>

            {errorMsg && <p className={styles.error}>{errorMsg}</p>}
            
            <button 
              type="submit" 
              className={styles.registerButton}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <p className={styles.tipText}>
              Tip: If you see "User already exists", try a different email or username.
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
}

export default Register;