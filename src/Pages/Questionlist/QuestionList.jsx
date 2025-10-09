

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "../../axiosConfig";
// import Layout from "../../component/Layout/Layout";
// import classes from "./questionlist.module.css"

// const QuestionList = ({ token }) => {
//   const [questions, setQuestions] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await axios.get("api/question", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.data.questions && Array.isArray(res.data.questions)) {
//           setQuestions(res.data.questions);
//         } else {
//           setError("No questions found.");
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load questions.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuestions();
//   }, [token]);

 
//   if (error) return <p>{error}</p>;
//   if (questions.length === 0)
//     return (
//       <p className={classes.emptyMessage}>
//         No questions available at the moment.
//       </p>
//     );
//   return (
//     <Layout>
//       <div className={classes.container}>
//         <h1 className={classes.questionListTitle}>All Questions</h1>
//         {questions.map((q) => (
//           <div key={q.question_id} className={classes.questionCard}>
//             <h3 className={classes.questionTitle}>
//               <Link to={`/question/${q.question_id}`} className={classes.questionLink}>
//                 {q.title}
//               </Link>
//             </h3>
//             <p className={classes.questionDescription}>{q.content?.slice(0, 100)}...</p>
//             <p className={classes.questionMeta}>
//               <strong>Posted by:</strong> {q.user_name} |{" "}
//               {new Date().toLocaleString()}
//             </p>
//           </div>
//         ))}
//       </div>
//     </Layout>
//   );
// };

// export default QuestionList;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../../axiosConfig";
import Layout from "../../component/Layout/Layout";
import classes from "./questionlist.module.css";

const QuestionList = ({ token }) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // ... (Your fetchQuestions function remains the same)
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("api/question", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.questions && Array.isArray(res.data.questions)) {
          // Assuming each question object (q) has q.question_id, q.title, and q.user_name
          setQuestions(res.data.questions);
        } else {
          setError("No questions found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [token]);

  // Handler to navigate when a card is clicked
  const handleQuestionClick = (id) => {
    navigate(`/question-detail/${id}`); // Use the correct detail path
  };

  if (error) return <p>{error}</p>;
  if (questions.length === 0)
    return (
      <p className={classes.emptyMessage}>
        No questions available at the moment.
      </p>
    );

  return (
    <Layout>
      <div className={classes.container}>
        <h1 className={classes.questionListTitle}>All Questions</h1>

        {questions.map((q) => (
          // Make the entire card the clickable area
          <div
            key={q.question_id}
            className={classes.questionCard}
            onClick={() => handleQuestionClick(q.question_id)} // Use the click handler
          >
            {/* 1. Profile Icon and Username (Left Side) */}
            <div className={classes.profileGroup}>
              <div className={classes.profileIcon}>
                {/* Placeholder for a profile icon (e.g., using a generic font icon) */}
                <i className="fa fa-user-circle"></i>
              </div>
              <p className={classes.usernameDisplay}>{q.user_name}</p>
            </div>

            {/* 2. Question Content (Center) */}
            <div className={classes.questionContent}>
              {/* Remove the redundant Link tag here since the whole div is clickable */}
              <h3 className={classes.questionTitle}>{q.title}</h3>
              {/* Description and Meta are hidden by CSS */}
            </div>

            {/* 3. Navigation Arrow (Right Side) */}
            <div className={classes.arrowIcon}>&gt;</div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default QuestionList;