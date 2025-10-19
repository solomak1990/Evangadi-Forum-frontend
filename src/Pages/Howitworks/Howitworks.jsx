// import React from "react";
// import "./howItWorks.css"



// const HowItWorks = () => {
//   return (
//     <div className="howitwork-page">
    
//       <section className="hero text-center text-white py-5">
//         <div className="container">
//           <h1 className="display-5 fw-bold">How Evangadi Forum Works</h1>
//           <p className="lead mt-3">
//             Connect, ask, and learn — our community thrives on shared knowledge
//             and collaboration.
//           </p>
//         </div>
//       </section>

    
//       <section className="getting-started py-5 bg-light">
//         <div className="container text-center">
//           <h2 className="fw-bold mb-4">Getting Started</h2>
//           <div className="row g-4">
//             <div className="col-md-4">
//               <div className="step-card shadow-sm p-4 h-100">
                
//                 <h5 className="fw-semibold">Sign Up</h5>
//             <p className="text-muted">
//                   Create an account with your details to join the Evangadi
//                   community.<br/>
//                   Fill in the required fields:<br />
//                   Username, First Name,<br/>
//                   Last Name, Email, and Password. <br />
//                   Click on the "Agree and Join"
//                   button to register.<br/> You will receive a confirmation message
//                   upon successful registration.
//                 </p> 
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="step-card shadow-sm p-4 h-100">
              
//                 <h5 className="fw-semibold">Ask or Answer</h5>
//                 <p className="text-muted">
//                   To browse and view questions and their answers: Navigate to
//                   the Home page to see a list of recent questions. Click on a
//                   question title to view its details and existing answers. If
//                   there are no answers, you'll see a prompt encouraging you to
//                   answer.
//                 </p>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="step-card shadow-sm p-4 h-100">
                
//                 <h5 className="fw-semibold">Engage</h5>
//                 <p className="text-muted">
//                   Discuss, upvote, and connect with peers for continuous
//                   learning.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

    
//       <section className="guidelines py-5">
//         <div className="container">
//           <h2 className="fw-bold text-center mb-4">Community Guidelines</h2>
//           <div className="row justify-content-center">
//             <div className="col-md-8">
//               <ul className="list-group list-group-flush text-start">
//                 <li className="list-group-item">
//                   ✅ Be respectful and kind to others.
//                 </li>
//                 <li className="list-group-item">
//                   💡 Ask clear, constructive questions.
//                 </li>
//                 <li className="list-group-item">
//                   🙌 Upvote helpful answers to support others.
//                 </li>
//                 <li className="list-group-item">
//                   🚫 Avoid spam, offensive language, or unrelated content.
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="cta text-center text-white py-5">
//         <div className="container">
//           <h2 className="fw-bold">Ready to Contribute?</h2>
//           <p className="mb-4">
//             Join thousands of learners exchanging ideas every day.
//           </p>
//           <a href="/register" className="btn btn-light px-4 py-2 fw-semibold">
//             Join Now
//           </a>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default HowItWorks;
import React from "react";
import "./howItWorks.css";

const HowItWorks = () => {
  return (
    <div className="howitwork-page">
      {/* Hero Section */}
      <section className="hero text-center text-white py-5 bg-primary">
        <div className="container">
          <h1 className="display-5 fw-bold">How Evangadi Forum Works</h1>
          <p className="lead mt-3">
            Connect, ask, and learn — our community thrives on shared knowledge
            and collaboration.
          </p>
        </div>
      </section>

      <section className="guidelines py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-5 text-dark">Getting Started</h2>
          <div className="row g-4">
            {/* Sign Up */}
            <div className="col-md-4">
              <div className="shadow-sm p-4 h-100 bg-white border rounded">
                <h5 className="fw-bold text-dark mb-3">📝 Sign Up</h5>
                <ul className="text-start text-dark fw-semibold">
                  <li>
                    <strong>Create an account</strong> to join the Evangadi
                    community.
                  </li>
                  <li>
                    <strong>Fill in required fields:</strong>
                  </li>
                  <ul className="ms-3">
                    <li>Username</li>
                    <li>First Name</li>
                    <li>Last Name</li>
                    <li>Email</li>
                    <li>Password</li>
                  </ul>
                  <li>
                    Click <strong>"Agree and Join"</strong> to register.
                  </li>
                  <li>Receive a confirmation message upon success.</li>
                </ul>
              </div>
            </div>

            {/* Ask or Answer */}
            <div className="col-md-4">
              <div className="shadow-sm p-4 h-100 bg-white border rounded">
                <h5 className="fw-bold text-dark mb-3">💬 Ask or Answer</h5>
                <ul className="text-start">
                  <li>
                    Go to the <strong>Home page</strong> to view questions.
                  </li>
                  <li>Click a question title to see details and answers.</li>
                  <li>If unanswered, you'll be prompted to contribute.</li>
                </ul>
              </div>
            </div>

            {/* Engage */}
            <div className="col-md-4">
              <div className="shadow-sm p-4 h-100 bg-white border rounded">
                <h5 className="fw-bold text-dark mb-3">🤝 Engage</h5>
                <ul className="text-start">
                  <li>Discuss with peers.</li>
                  <li>Upvote helpful answers.</li>
                  <li>Connect for continuous learning.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="guidelines py-5 bg-white">
        <div className="container">
          <h2 className="fw-bold text-center mb-4">Community Guidelines</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <ul className="list-group list-group-flush text-start fs-5">
                <li className="list-group-item">
                  ✅ Be respectful and kind to others.
                </li>
                <li className="list-group-item">
                  💡 Ask clear, constructive questions.
                </li>
                <li className="list-group-item">
                  🙌 Upvote helpful answers to support others.
                </li>
                <li className="list-group-item">
                  🚫 Avoid spam, offensive language, or unrelated content.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta text-center text-white py-5 bg-dark">
        <div className="container">
          <h2 className="fw-bold">Ready to Contribute?</h2>
          <p className="mb-4">
            Join thousands of learners exchanging ideas every day.
          </p>
          <a href="/register" className="btn btn-warning px-4 py-2 fw-semibold">
            Join Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

