import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axiosConfig";
import Layout from "../../component/Layout/Layout"; // Assuming you use Layout
import classes from "./SingleQuestion.module.css"; // New CSS module

const SingleQuestion = () => {
  // Renamed from QuestionDetail
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper function to get token
  const getToken = () => localStorage.getItem("auth-token");

  // Fetch question details
  const fetchQuestion = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`api/question/${id}`, {
        headers: { Authorization: "Bearer " + token },
      });
      // The API response for a single question usually includes all its answers
      // If your API does this, you only need to call fetchQuestion.
      // Assuming your API separates question and answers, we keep both calls for safety.
      setQuestion(res.data);
    } catch (err) {
      console.error("Error fetching question:", err);
      setError("Failed to load question");
    }
  };

  // Fetch answer data for the given question
  const fetchAnswers = async () => {
    try {
      const token = getToken();
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

  // Perform data fetching when component loads or ID changes
  useEffect(() => {
    fetchQuestion();
    fetchAnswers();
  }, [id]);

  // Provide a new response
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      const token = getToken();
      const res = await axios.post(
        "api/answer",
        { questionid: id, answer: newAnswer },
        { headers: { Authorization: "Bearer " + token } }
      );
      setNewAnswer("");
      // Add the new answer to the state immediately instead of re-fetching everything
      // NOTE: This assumes res.data is the new answer object including 'username' and 'answerid'
      setAnswers((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error submitting answer:", err);
      setError("Failed to submit answer");
    }
  };

  if (loading)
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <div className="alert alert-danger">{error}</div>
      </Layout>
    );

  return (
    <Layout>
      <div className={classes.container}>
        {/* ========================================
        Question Section
        ========================================
      */}
        {question && (
          <div className={classes.questionSection}>
            <p className={classes.topText}>Question</p>
            <div className={classes.questionCard}>
              {/* Left Side: Profile Icon and Username */}
              <div className={classes.profileGroup}>
                <div className={classes.profileIcon}>
                  <i className="fa fa-user-circle"></i>
                </div>
                <p className={classes.usernameDisplay}>
                  {question.username || "Anonymous"}
                </p>
              </div>

              {/* Right Side: Title and Description */}
              <div className={classes.questionContent}>
                <h2 className={classes.questionTitle}>{question.title}</h2>
                <p className={classes.questionDescription}>
                  {question.description}
                </p>
              </div>
            </div>
            <hr className={classes.separator} />
          </div>
        )}

        {/* ========================================
        Answers Section
        ========================================
      */}
        <div className={classes.answersSection}>
          <h4 className={classes.answersHeader}>
            Answer From The Community ({answers.length})
          </h4>

          {answers.length === 0 ? (
            <p className={classes.noAnswers}>
              No answers yet. Be the first to reply!
            </p>
          ) : (
            answers.map((a) => (
              <div key={a.answerid} className={classes.answerCard}>
                {/* Answer Profile Group */}
                <div className={classes.profileGroup}>
                  <div className={classes.profileIcon}>
                    <i className="fa fa-user-circle"></i>
                  </div>
                  <p className={classes.usernameDisplay}>
                    {a.username || "Anonymous"}
                  </p>
                </div>

                {/* Answer Content */}
                <div className={classes.answerContent}>
                  <p>{a.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ========================================
        Add New Answer Form
        ========================================
      */}
        <div className={classes.newAnswerContainer}>
          <h5 className={classes.newAnswerHeader}>Answer The Question</h5>
          <form onSubmit={handleSubmit} className={classes.answerForm}>
            <textarea
              className={classes.answerTextarea}
              rows="5"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Write your answer..."
            ></textarea>
            <button className={classes.postAnswerButton} type="submit">
              Post Your Answer
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SingleQuestion;