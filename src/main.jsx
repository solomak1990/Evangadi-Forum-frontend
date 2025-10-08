// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import { UserProvider } from "./component/Dataprovide/DataProvider.jsx";

const authToken = localStorage.getItem("authtoken");
// const initialUserData = authToken
//   ? { user: undefined, token: authToken }
//   : { user: undefined, token: undefined };

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
    {/* <UserProvider value={initialUserData}>
      <App />
    </UserProvider> */}
  </React.StrictMode>
);
