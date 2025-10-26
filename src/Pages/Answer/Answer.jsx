import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import Layout from "../../component/Layout/Layout";
import { UserContext } from "../../component/Dataprovider/DataProvider";
import "./answer.module.css"; // optional

function Answer() {
  const { question_id } = useParams(); // get question id from URL
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await axios.get(`/answer/${question_id}`);
        setAnswers(response.data.answers); // match backend { answers }
      } catch (err) {
        console.error("Error fetching answers:", err);
        setError("Failed to load answers.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnswers();
  }, [question_id]);

  const handleDelete = async (answerId) => {
    if (!window.confirm("Are you sure you want to delete this answer?")) return;
    try {
      await axios.delete(`/answer/${answerId}`);
      setAnswers((prev) => prev.filter((a) => a.answer_id !== answerId));
    } catch (err) {
      alert("Error deleting answer.");
    }
  };

  const handleEdit = (answerId) => {
    navigate(`/answers/edit/${answerId}`);
  };

  if (loading) return <Layout><p>Loading answers...</p></Layout>;
  if (error) return <Layout><p>{error}</p></Layout>;

  return (
    <Layout>
      <div className="answer-container">
        <div className="answer-header">
          <h2>All Answers</h2>
          <Link to={`/answers/new/${question_id}`} className="add-btn">
            + Add Answer
          </Link>
        </div>

        {answers.length === 0 ? (
          <p>No answers yet.</p>
        ) : (
          <div className="answer-list">
            {answers.map((ans) => (
              <div className="answer-card" key={ans.answer_id}>
                <div className="answer-content">
                  <h3 className="answer-title">{ans.user_name}</h3>
                  <p className="answer-text">
                    {ans.content.length > 120
                      ? ans.content.slice(0, 120) + "..."
                      : ans.content}
                  </p>
                </div>

                {user && user.userid === ans.user_id && (
                  <div className="answer-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(ans.answer_id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(ans.answer_id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Answer;
