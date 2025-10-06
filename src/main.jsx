
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./component/Dataprovide/DataProvider.jsx";

const authToken = localStorage.getItem("authtoken");
const initialUserData = authToken
  ? { user: undefined, token: authToken }
  : { user: undefined, token: undefined };

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <React.StrictMode>
    <UserProvider value={initialUserData}>
      <App />
    </UserProvider>
  </React.StrictMode>
);
