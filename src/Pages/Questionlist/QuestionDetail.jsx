
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedTag, setEditedTag] = useState("");

  const fetchQuestion = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const res = await axios.get(`api/question/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setQuestion(res.data);
      setEditedTitle(res.data.title);
      setEditedDescription(res.data.description);
      setEditedTag(res.data.tag || "");
    } catch (err) {
      console.error("Error fetching question:", err);
      setError("Failed to load question");
    }
  };

  const fetchAnswers = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      const res = await axios.get(`api/answer/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      setAnswers(res.data);
    } catch (err) {
      console.error("Error fetching answers:", err);
      setAnswers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      const token = localStorage.getItem("auth-token");
      await axios.post(
        "api/answer",
        { questionid: id, answer: newAnswer },
        { headers: { Authorization: "Bearer " + token } }
      );
      setNewAnswer("");
      fetchAnswers();
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError("Failed to submit answer");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;

    try {
      const token = localStorage.getItem("auth-token");
      await axios.delete(`api/question/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      alert("Question deleted successfully.");
      navigate("/questions");
    } catch (err) {
      console.error("Error deleting question:", err);
      setError("Failed to delete question.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("auth-token");
      await axios.put(
        `api/question/${id}`,
        {
          title: editedTitle,
          description: editedDescription,
          tag: editedTag,
        },
        { headers: { Authorization: "Bearer " + token } }
      );
      alert("Question updated successfully.");
      setEditing(false);
      fetchQuestion();
    } catch (err) {
      console.error("Error updating question:", err);
      setError("Failed to update question.");
    }
  };

  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [id]);

  if (loading) return <div className="container py-4">Loading...</div>;
  if (error)
    return <div className="container py-4 alert alert-danger">{error}</div>;

  const isAuthor =
    question?.username?.toLowerCase() ===
    localStorage.getItem("username")?.toLowerCase();

  return (
    <div className="container py-4">
      {question && (
        <>
          {editing ? (
            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  className="form-control"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Tag</label>
                <input
                  className="form-control"
                  value={editedTag}
                  onChange={(e) => setEditedTag(e.target.value)}
                />
              </div>
              <button className="btn btn-success me-2" type="submit">
                Save
              </button>
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h2 className="mb-3">{question.title}</h2>
              <p>{question.description}</p>
              {question.tag && (
                <p>
                  <strong>Tag:</strong> {question.tag}
                </p>
              )}
              <p className="text-muted">Asked by {question.username}</p>
              {isAuthor && (
                <div className="mb-3">
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => setEditing(true)}
                  >
                    Edit Question
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete Question
                  </button>
                </div>
              )}
            </>
          )}
          <hr />
        </>
      )}

      <div className="mt-4">
        <h4>Answers</h4>
        {answers.length === 0 ? (
          <p>No answers yet. Be the first to reply!</p>
        ) : (
          answers.map((a) => (
            <div key={a.answerid} className="border rounded p-3 mb-3">
              <p>{a.answer}</p>
              <small className="text-muted">By {a.username}</small>
            </div>
          ))
        )}
      </div>

      <div className="mt-4">
        <h5>Your Answer</h5>
        <form onSubmit={handleSubmit}>
          <textarea
            className="form-control mb-3"
            rows="4"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
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


