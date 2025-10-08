

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classes from "./questionlist.module.css"
import { Circles } from "react-loader-spinner";
const QuestionList = ({ token }) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/api/allquestion", {
          headers: { Authorization: `Bearer ${token}` },
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
  }, [token]);

  if (loading) return <Circles color="#00BFFF" height={80} width={80} />;
  if (error) return <p>{error}</p>;
  if (questions.length === 0)
    return (
      <p className={classes.emptyMessage}>
        No questions available at the moment.
      </p>
    );
  return (
    <div>
      <h1 className={classes.questionListTitle}>All Questions</h1>
      {questions.map((q) => (
        <div key={q.questionid} className={classes.questionCard}>
          <h3 className={classes.questionTitle}>
            <Link to={`/questions/${q.questionid}`} className={classes.questionLink}>
              {q.title}
            </Link>
          </h3>
          <p >{q.description?.slice(0, 100)}...</p>
          <p className={classes.questionMeta}>
            <strong>Posted by:</strong> {q.username} |{" "}
            {new Date(q.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;


