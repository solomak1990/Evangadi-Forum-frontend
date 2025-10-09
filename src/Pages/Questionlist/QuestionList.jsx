

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axiosConfig";
import Layout from "../../component/Layout/Layout";
import classes from "./questionlist.module.css"

const QuestionList = ({ token }) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("api/question", {
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

 
  if (error) return <p>{error}</p>;
  if (questions.length === 0)
    return (
      <p className={classes.emptyMessage}>
        No questions available at the moment.
      </p>
    );
  return (
    <Layout>
      <div className={classes.container}>
        <h1 className={classes.questionListTitle}>All Questions</h1>
        {questions.map((q) => (
          <div key={q.question_id} className={classes.questionCard}>
            <h3 className={classes.questionTitle}>
              <Link to={`/question/${q.question_id}`} className={classes.questionLink}>
                {q.title}
              </Link>
            </h3>
            <p className={classes.questionDescription}>{q.content?.slice(0, 100)}...</p>
            <p className={classes.questionMeta}>
              <strong>Posted by:</strong> {q.user_name} |{" "}
              {new Date().toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default QuestionList;


