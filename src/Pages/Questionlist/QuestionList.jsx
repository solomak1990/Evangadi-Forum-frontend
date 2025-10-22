<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../../axiosConfig";
import classes from "./questionlist.module.css";

const QuestionList = ({ token, questions: questionsProp }) => {
  const [questions, setQuestions] = useState(Array.isArray(questionsProp) ? questionsProp : []);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // If questions are passed as props, use them and don't fetch
    if (Array.isArray(questionsProp) && questionsProp.length >= 0) {
      setQuestions(questionsProp);
      setLoading(false);
=======
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
// import axios from "../../axiosConfig";
// import classes from "./questionlist.module.css";
// //accepts 2 props 
// const QuestionList = ({ token, questions: questionsProp }) => {
//   const [questions, setQuestions] = useState(Array.isArray(questionsProp) ? questionsProp : []);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   //used to redirect user to questions detail page
//   const navigate = useNavigate(); // Initialize navigate

//   useEffect(() => {
//     // If questions are passed as props, use them and don't fetch
//     if (Array.isArray(questionsProp) && questionsProp.length >= 0) {
//       setQuestions(questionsProp);
//       setLoading(false);
//       return;
//     }

//     const fetchQuestions = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("/api/question", {
//           headers: token ? { Authorization: `Bearer ${token}` } : undefined,
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
//   }, [token, questionsProp]);

//   // Handler to navigate when a card is clicked
//   const handleQuestionClick = (id) => {
//     navigate(`/question/${id}`);
//   };

//   if (error) return <p>{error}</p>;
//   if (questions.length === 0)
//     return (
//       <p className={classes.emptyMessage}>
//         No questions available at the moment.
//       </p>
//     );

//   return (
//     <div className={classes.container}>
//       <h1 className={classes.questionListTitle}>All Questions</h1>
      
//       {questions.map((q) => (
//         <div
//           key={q.question_id}
//           className={classes.questionCard}
//           onClick={() => handleQuestionClick(q.question_id)}
//         >
//           <div className={classes.profileGroup}>
//             <div className={classes.profileIcon}>
//               {q.user_name?.charAt(0)?.toUpperCase()}
//             </div>
//             <p className={classes.usernameDisplay}>{q.user_name}</p>
//           </div>

//           <div className={classes.questionContent}>
//             <h3 className={classes.questionTitle}>{q.title}</h3>
//           </div>


//           <div className={classes.arrowIcon}>&gt;</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default QuestionList;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import classes from "./questionlist.module.css";

const ITEMS_PER_PAGE = 5;

const QuestionList = ({ token, questions: questionsProp }) => {
  const [questions, setQuestions] = useState(
    Array.isArray(questionsProp) ? questionsProp : []
  );
  const [error, setError] = useState("");
  // const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(questionsProp) && questionsProp.length >= 0) {
      setQuestions(questionsProp);
      // setLoading(false);
>>>>>>> 35ad484c3bdb969e09520c0e8e10838a8dce1e80
      return;
    }

    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/question", {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        if (res.data.questions && Array.isArray(res.data.questions)) {
          setQuestions(res.data.questions);
        } else {
          setError("No questions found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load questions.");
<<<<<<< HEAD
      } finally {
        setLoading(false);
      }
=======
      }
      
      // finally {
      // //   setLoading(false);
      // // }
>>>>>>> 35ad484c3bdb969e09520c0e8e10838a8dce1e80
    };
    fetchQuestions();
  }, [token, questionsProp]);

<<<<<<< HEAD
  // Handler to navigate when a card is clicked
=======
>>>>>>> 35ad484c3bdb969e09520c0e8e10838a8dce1e80
  const handleQuestionClick = (id) => {
    navigate(`/question/${id}`);
  };

<<<<<<< HEAD
  if (error) return <p>{error}</p>;
  if (questions.length === 0)
    return (
      <p className={classes.emptyMessage}>
        No questions available at the moment.
      </p>
    );
=======
  const totalPages = Math.ceil(questions.length / ITEMS_PER_PAGE);
  const paginatedQuestions = questions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // if (error) return <p>{error}</p>;
  // if (questions.length === 0)
  //   return (
  //     <p className={classes.emptyMessage}>
  //       No questions available at the moment.
  //     </p>
  //   );
>>>>>>> 35ad484c3bdb969e09520c0e8e10838a8dce1e80

  return (
    <div className={classes.container}>
      <h1 className={classes.questionListTitle}>All Questions</h1>
<<<<<<< HEAD
      
      {questions.map((q) => (
        <div
          key={q.question_id}
          className={classes.questionCard}
          onClick={() => handleQuestionClick(q.question_id)}
        >
          <div className={classes.profileGroup}>
            <div className={classes.profileIcon}>
              {q.user_name?.charAt(0)?.toUpperCase()}
            </div>
            <p className={classes.usernameDisplay}>{q.user_name}</p>
          </div>

          <div className={classes.questionContent}>
            <h3 className={classes.questionTitle}>{q.title}</h3>
          </div>

          <div className={classes.arrowIcon}>&gt;</div>
        </div>
      ))}
=======

      <table className={classes.questionTable}>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Username</th>
            <th>Question Title</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {paginatedQuestions.map((q) => (
            <tr
              key={q.question_id}
              className={classes.questionRow}
              onClick={() => handleQuestionClick(q.question_id)}
            >
              <td className={classes.profileIcon}>
                {q.user_name?.charAt(0)?.toUpperCase()}
              </td>
              <td>{q.user_name}</td>
              <td>{q.title}</td>
              {/* <td className={classes.arrowIcon}>&gt;</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={classes.pagination}>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
>>>>>>> 35ad484c3bdb969e09520c0e8e10838a8dce1e80
    </div>
  );
};

export default QuestionList;
