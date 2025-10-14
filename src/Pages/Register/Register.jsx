import { useRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axiosBase from "../../axiosConfig";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import styles from "./register.module.css";

function Register() {
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameValue = usernameDom.current.value;
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
    if (!agree) {
      alert("Please agree to the privacy policy and terms of service.");
      return;
    }

    try {
      await axiosBase.post("api/user/register", {
        username: usernameValue,
        first_name: firstValue,
        last_name: lastValue,
        email: emailValue,
        password: passValue,
      });
      
      alert("Registration successful. Please log in.");
      navigate("/login");
    } catch (error) {
      alert("something went wrong!");
      console.log(error.response);
    }
  }
  return (
    <Layout>
      <section className={styles.registerSection}>
        <div className={styles.registerContainer}>
          <h2 className={styles.registerTitle}>Join the network</h2>
          <p className={styles.registerSubtitle}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
          
          <form onSubmit={handleSubmit} className={styles.registerForm}>
            <div className={styles.formGroup}>
              <input 
                ref={userNameDom} 
                type="text" 
                placeholder="Username" 
                className={styles.input}
                required
              />
            </div>

            <div className={styles.rowGroup}>
              <input
                ref={firstnameDom}
                type="text"
                placeholder="First name"
                className={styles.input}
                required
              />
              <input
                ref={lastnameDom}
                type="text"
                placeholder="Last name"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input 
                ref={emailDom} 
                type="email" 
                placeholder="Email address" 
                className={styles.input}
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <div className={styles.passwordWrapper}>
                <input
                  ref={passwordDom}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className={styles.consentRow}>
              <label>
                <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} />
                <span> I agree to the <a href="#">privacy policy</a> and <a href="#">terms of service</a>.</span>
              </label>
            </div>

            <button type="submit" className={styles.registerButton}>
              Agree and Join
            </button>
          </form>

          <p className={styles.bottomLink}>Already have an account?</p>
        </div>
      </section>
    </Layout>
  );
}
export default Register;