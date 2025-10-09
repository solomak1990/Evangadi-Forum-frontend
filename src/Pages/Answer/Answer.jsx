import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../component/Dataprovider/DataProvider";
import axios from "../../axiosConfig";
import Layout from "../../component/Layout/Layout";
import classes from "./answer.module.css";

const Answer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData] = useContext(UserContext);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userData.user) {
      navigate("/login");
      return;
    }
    fetchQuestionDetails();
  }, [id, userData.user, navigate]);

  const fetchQuestionDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`api/question/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuestion(response.data.question);
      // Fetch answers separately since backend doesn't return them with question
      try {
        const answersResponse = await axios.get(`api/answer/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnswers(answersResponse.data.answers || []);
      } catch (answerError) {
        console.log("No answers found or error fetching answers");
        setAnswers([]);
      }
    } catch (error) {
      console.error("Error fetching question:", error);
      setError("Failed to load question details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) {
      alert("Please enter your answer");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("api/answer", {
        question_id: id,
        answer: newAnswer,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNewAnswer("");
      fetchQuestionDetails(); // Refresh answers
      alert("Answer posted successfully!");
    } catch (error) {
      console.error("Error posting answer:", error);
      alert("Failed to post answer");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className={classes.loading}>Loading question details...</div>
      </Layout>
    );
  }

  if (error || !question) {
    return (
      <Layout>
        <div className={classes.error}>Error loading question: {error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={classes.container}>
        {/* Question Section */}
        <div className={classes.questionSection}>
          <h1 className={classes.questionTitle}>{question.title}</h1>
          <p className={classes.questionDescription}>{question.content}</p>
          <div className={classes.questionMeta}>
            <span>Asked by: {question.user_id}</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Answer Form */}
        <div className={classes.answerFormSection}>
          <h3>Your Answer</h3>
          <form onSubmit={handleSubmitAnswer}>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Write your answer here..."
              className={classes.answerTextarea}
              rows={6}
            />
            <button type="submit" className={classes.submitButton}>
              Post Answer
            </button>
          </form>
        </div>

        {/* Existing Answers */}
        <div className={classes.answersSection}>
          <h3>{answers.length} Answer{answers.length !== 1 ? 's' : ''}</h3>
          {answers.length === 0 ? (
            <p className={classes.noAnswers}>No answers yet. Be the first to answer!</p>
          ) : (
            answers.map((answer, index) => (
              <div key={index} className={classes.answerItem}>
                <div className={classes.answerHeader}>
                  <span className={classes.answerAuthor}>{answer.user_name || 'Anonymous'}</span>
                  <span className={classes.answerDate}>
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <p className={classes.answerText}>{answer.answer}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Answer;
