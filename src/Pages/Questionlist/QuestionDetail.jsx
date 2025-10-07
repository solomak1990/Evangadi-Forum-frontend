// src/pages/QuestionDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosBase from "../../axiosconfig"; // adjust the path if needed

const QuestionDetail = () => {
  const { id } = useParams(); // get question ID from URL
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    axiosBase
      .get(`/singlequestion/${id}`)
      .then((response) => {
        setQuestion(response.data);
      })
      .catch((error) => {
        console.error("Error fetching question:", error);
      });
  }, [id]);

  if (!question) return <p>Loading...</p>;

  return (
    <div>
      <h2>{question.title}</h2>
      <p>{question.body}</p>
      {/* Show more fields as needed */}
    </div>
  );
};

export default QuestionDetail;
