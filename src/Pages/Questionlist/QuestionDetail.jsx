import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig"

const QuestionDetail = () => {
  const {id} = useParams(); // Extract the question ID from the URL
  const [question, setQuestion] = useState(null); // Question details
  const [answers, setAnswers] = useState([]); // list of answers
  const [newAnswer, setNewAnswer] = useState(""); // new answer input
  const [error, setError] = useState(null); // error message
  const [loading, setLoading] = useState(true); // loading state

  // fetch question details
  const fetchQuestion = async () => {
    try {
      const token = localStorage.getItem("auth-token"); // Access token from storage
      const res = await axios.get(`api/question/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setQuestion(res.data);
    } catch (err) {
      console.error("Error fetching question:", err);
      setError("Failed to load question"); // Display an error message on failure
    }
  };

  // Fetch answer data for the given question
  const fetchAnswers = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const res = await axios.get(`api/answer/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setAnswers(res.data);
    } catch (err) {
      console.error("Error fetching answers:", err);
      setAnswers([]); // clear answers on error
    } finally {
      setLoading(false); // stop loading
    }
  };

  // Perform data fetching when component loads or ID changes
  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [id]);

  // Provide a new response
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return; // Block empty input on submit

    try {
      const token = localStorage.getItem("auth-token");
      await axios.post(
        "api/answer",
        { questionid: id, answer: newAnswer }, // Send the question ID along with the answer in the request
        { headers: { Authorization: "Bearer " + token } }
      );
      setNewAnswer(""); // clear input
      fetchAnswers(); // refresh answers
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError("Failed to submit answer"); // show error
    }
  };

  if (loading) return <div>Loading...</div>; // show loading spinner/text
  if (error) return <div className="alert alert-danger">{error}</div>; // show error

  return (
    <div className="container py-4">
      {question && (
        <>
          {/* Display question */}
          <h2 className="mb-3">{question.title}</h2>
          <p>{question.description}</p>
          {question.tag && <p><strong>Tag:</strong> {question.tag}</p>}
          <p className="text-muted">Asked by {question.username}</p>
          <hr />
        </>
      )}

      {/* Answers Section */}
      <div className="mt-4">
        <h4>Answers</h4>
        {answers.length === 0 ? (
          <p>No answers yet. Be the first to reply!</p> // if no answers
        ) : (
          answers.map((a) => (
            <div key={a.answerid} className="border rounded p-3 mb-3">
              <p>{a.answer}</p>
              <small className="text-muted">By {a.username}</small>
            </div>
          ))
        )}
      </div>

      {/* Add New Answer Form */}
      <div className="mt-4">
        <h5>Your Answer</h5>
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-3"
            rows="4"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)} // track input
            placeholder="Write your answer..."
          ></textarea>
          <button className="btn btn-warning" type="submit">
            Post Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionDetail;
