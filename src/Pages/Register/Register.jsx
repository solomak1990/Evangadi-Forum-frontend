import { useRef } from "react";
import axiosBase from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import "./register.module.css";

function Register() {
  
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

    try {
      await axiosBase.post("/users/register", {
        username: usernameValue,
        firstname: firstValue,
        lastname: lastValue,
        email: emailValue,
        password: passValue,
      });
      
      alert("Registration successful. Please log in.");
    } catch (error) {
      
      const message = error.response?.data?.message || "Something went wrong!";
      alert(message);
      console.error(error);
    }
  }
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Username :---</span>
          <input ref={userNameDom} type="text" placeholder="username" />
        </div>
        <br />
        <div>
          <span>First name :---</span>
          <input
            ref={firstnameDom}
            type="text"
            placeholder="first name"
            required
          />
        </div>
        <br />
        <div>
          <span>last name :--- </span>
          <input
            ref={lastnameDom}
            type="text"
            placeholder="last name"
            required
          />
        </div>
        <br />
        <div>
          <span>email :---</span>
          <input ref={emailDom} type="email" placeholder="email" required />
        </div>
        <br />
        <div>
          <span>password :--- </span>
          <input
            ref={passwordDom}
            type="password"
            placeholder="password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default Register;
