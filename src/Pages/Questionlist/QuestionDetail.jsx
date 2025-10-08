import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";

const QuestionDetailPage = () => {
  const { questionid } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestionAndAnswers = async () => {
      try {
        const [questionRes, answersRes] = await Promise.all([
          axios.get(`/api/singlequestion/${questionid}`),
          axios.get(`/api/answers/${questionid}`),
        ]);

        setQuestion(questionRes.data);
        setAnswers(answersRes.data.answers);
      } catch (err) {
        setError("Failed to load question or answers.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndAnswers();
  }, [questionid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{question.title}</h2>
      <p>{question.description}</p>
      <hr />
      <h3>Answers</h3>
      {!answers || answers.length === 0 ? (
        <p>No answers yet. Be the first to respond!</p>
      ) : (
        <ul>
          {answers.map((ans) => (
            <li key={ans.answer_id} style={{ marginBottom: "1rem" }}>
              <strong>{ans.user_name}</strong> said:
              <p>{ans.content}</p>
              <small>{new Date(ans.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuestionDetailPage;
