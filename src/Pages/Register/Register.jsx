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
          <span>User Nname :---</span>
          <input ref={userNameDom} type="text" placeholder="User Name" />
        </div>
        <br />
        <div>
          <span>First Name :---</span>
          <input
            ref={firstnameDom}
            type="text"
            placeholder="First Name"
            required
          />
        </div>
        <br />
        <div>
          <span>Last Name :--- </span>
          <input
            ref={lastnameDom}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <br />
        <div>
          <span>Email :---</span>
          <input ref={emailDom} type="email" placeholder="Email" required />
        </div>
        <br />
        <div>
          <span>Password :--- </span>
          <input
            ref={passwordDom}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </section>
  );
}

export default Register;
