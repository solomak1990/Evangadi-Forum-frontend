
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import QuestionList from "./components/QuestionList"; // adjust path as needed

// const App = () => {
//   const token = "your-auth-token"; // Replace with actual token logic

//   return (
//     <Router>
//       <Routes>
//         <Route path="/questions" element={<QuestionList token={token} />} />
//         {/* Other routes */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from 'react'
import QuestionList from './Pages/Questionlist/QuestionList'

const App = () => {
  return (



    <div>


      <QuestionList/>
    </div>
  )
}

export default App
