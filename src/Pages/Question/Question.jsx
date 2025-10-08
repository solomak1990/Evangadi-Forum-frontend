import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../component/Dataprovider/DataProvider.jsx";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import Layout from "../../component/Layout/Layout";
import classes from "./question.module.css";

function Question() {
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const titleDom = useRef();
  const descriptionDom = useRef();

  useEffect(() => {
    if (!userData.user) navigate("/login");
  }, [userData.user, navigate]);
  const token = localStorage.getItem("token");
  async function handleSubmit(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;

    if (!titleValue || !descriptionValue) {
      alert("Please provide all required information");
      return;
    }
    try {
      await axios.post(
        "/questions/askQuestion",
        {
          title: titleValue,
          description: descriptionValue,
          userid: userData?.user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Thank you for your question");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.msg || "Something went wrong!");
    }

  }
  return (
    <Layout>
      <div className={classes.question_container}>
        <div className={classes.question_wrapper}>
          <h3 className={classes.question_headtitle}>
            Steps to write a good Question
          </h3>
          <ul className={classes.question_li}>
            <li>Summarize your problems in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>
              Explain what you have tried and what you expected to happen.
            </li>
            <li>Review your question and post it to the site.</li>
          </ul>
          <h4>Ask a public question</h4>
          <div className={classes.question_headtitle2}>
            <form onSubmit={handleSubmit}>
              <input
                className={classes.question_title}
                ref={titleDom}
                type="text"
                placeholder="Title"
              />
              <textarea
                rows={4}
                className={classes.question_description}
                ref={descriptionDom}
                type="text"
                placeholder="Question Description..."
              />
              <span>
                <button
                  className={classes.question_button}
                  variant="primary"
                  type="submit"
                >
                  Post Your Question
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Question;
