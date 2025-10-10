import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./questionlist.module.css";

const QuestionList = ({ questions }) => {
  const navigate = useNavigate();

  const handleQuestionClick = (id) => {
    navigate(`/question-detail/${id}`);
  };

  if (!questions || questions.length === 0) {
    return (
      <p className={classes.emptyMessage}>
        No questions available at the moment.
      </p>
    );
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.questionListTitle}>All Questions ({questions.length})</h1>
      
      {questions.map((q) => (
        <div
          key={q.question_id || q.id}
          className={classes.questionCard}
          onClick={() => handleQuestionClick(q.question_id || q.id)}
        >
          <div className={classes.profileGroup}>
            <div className={classes.profileIcon}>
              <i className="fa fa-user-circle"></i>
            </div>
            <p className={classes.usernameDisplay}>
              {q.user_name || q.username || "Anonymous"}
            </p>
          </div>

          <div className={classes.questionContent}>
            <h3 className={classes.questionTitle}>{q.title}</h3>
            {q.description && (
              <p className={classes.questionDescription}>
                {q.description.length > 150 
                  ? `${q.description.substring(0, 150)}...` 
                  : q.description
                }
              </p>
            )}
          </div>

          <div className={classes.arrowIcon}>&gt;</div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;