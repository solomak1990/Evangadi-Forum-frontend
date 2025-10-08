import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RingLoader from "./RingLoader/RingLoader";
import Layout from "./Layout/Layout";
import classes from "./SingleQuestion.module.css";

const SingleQuestion = ({ token }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`/api/question/${id}`);
        if (res.data.question) {
          setQuestion(res.data.question);
        } else {
          setError("We cannot find the Question");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load question.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newAnswer === "" || newAnswer === " ") {
      alert("Answer cannot be empty");
      return;
    }

    try {
      
      const res = await axios.post(
        `/api/answer`,
        { questionid: id, answer: newAnswer },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      
      const updatedAnswers = question.answers
        ? question.answers.concat(res.data.answer)
        : [res.data.answer];

      setQuestion({ ...question, answers: updatedAnswers });

      setNewAnswer("");
    } catch (err) {
      console.error(err);
      alert("Failed to post answer.");
    }
  };

  if (loading) return <RingLoader />;
  if (error) return <p className={classes.error}>{error}</p>;

  return (
    <Layout>
      <div className={classes.singleQuestionContainer}>
        <div className={classes.questionCard}>
          <h2 className={classes.questionTitle}>{question.title}</h2>
          <p className={classes.questionDescription}>{question.content}</p>
          <p>
            <strong>Posted by:</strong> User {question.id}
          </p>
        </div>

        <div className={classes.answersSection}>
          <h3>Answers From The Community</h3>

          {question.answers && question.answers.length > 0 ? (
            question.answers.map((answer) => (
              <div key={answer.answer_id} className={classes.answerCard}>
                <p>{answer.content}</p>
                <small>— {answer.username}</small>
              </div>
            ))
          ) : (
            <p>No answers yet.</p>
          )}

          <form onSubmit={handleSubmit} className={classes.newAnswerForm}>
            <textarea
              placeholder="Your answer …"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className={classes.newAnswerTextarea}
            />
            <button type="submit" className={classes.postAnswerButton}>
              Post Answer
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SingleQuestion;
