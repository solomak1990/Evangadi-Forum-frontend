import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../../axiosConfig";
import classes from "./questionlist.module.css";

const QuestionList = ({ token, questions: questionsProp }) => {
  const [questions, setQuestions] = useState(Array.isArray(questionsProp) ? questionsProp : []);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // If questions are passed as props, use them and don't fetch
    if (Array.isArray(questionsProp) && questionsProp.length >= 0) {
      setQuestions(questionsProp);
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/question", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (res.data.questions && Array.isArray(res.data.questions)) {
          setQuestions(res.data.questions);
        } else {
          setError("No questions found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [token, questionsProp]);

  // Handler to navigate when a card is clicked
  const handleQuestionClick = (id) => {
    navigate(`/question/${id}`);
  };

  if (error) return <p>{error}</p>;
  if (questions.length === 0)
    return (
      <p className={classes.emptyMessage}>
        No questions available at the moment.
      </p>
    );

  return (
    <div className={classes.container}>
      <h1 className={classes.questionListTitle}>All Questions</h1>
      
      {questions.map((q) => (
        <div
          key={q.question_id}
          className={classes.questionCard}
          onClick={() => handleQuestionClick(q.question_id)}
        >
          <div className={classes.profileGroup}>
            <div className={classes.profileIcon}>
              {q.user_name?.charAt(0)?.toUpperCase()}
            </div>
            <p className={classes.usernameDisplay}>{q.user_name}</p>
          </div>

          <div className={classes.questionContent}>
            <h3 className={classes.questionTitle}>{q.title}</h3>
          </div>

          <div className={classes.arrowIcon}>&gt;</div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;