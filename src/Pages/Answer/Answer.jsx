import React from "react";
import classes from "./answer.module.css";

const profile = "https://via.placeholder.com/48x48.png?text=U";

const Answer = ({ answer, userName }) => {
  return (
    <div className={classes.answerContainer}>
      <hr className={classes.separator} />

      <div className={classes.answerRow}>
        {/* Left Section - User Info */}
        <div className={classes.userSection}>
          <img className={classes.avatar} src={profile} alt="User Avatar" />
          <h6 className={classes.username}>{userName || "Anonymous"}</h6>
        </div>

        {/* Right Section - Answer Text */}
        <div className={classes.textSection}>
          <h6 className={classes.answerText}>
            {answer || "No answer provided."}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Answer;
