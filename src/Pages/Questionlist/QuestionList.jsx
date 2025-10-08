

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import classes from "./questionlist.module.css"

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

  if (loading) return <p className={classes.loadingMessage}>Loading questions...</p>;
  if (error) return <p className={classes.errorMessage}>{error}</p>;

  return (
    <div className={classes.questionListContainer}>
      <h1 className={classes.questionLlistTitle}>All Questions</h1>
      {questions.map((q) => (
        <div key={q.id} className={classes.questionCard}>
          <h3 className={classes.question-title}>
            <Link to={`/questions/${q.id}`} className={classes.questionLink}>
              {q.title}
            </Link>
          </h3>
          <p className={classes.questionSnippet}>{q.description?.slice(0, 100)}...</p>
          <p className={classes.questionMeta}>
            <strong>Posted by:</strong> {q.user_name} |{" "}
            {new Date(q.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;


