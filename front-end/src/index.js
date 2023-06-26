import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ReactKeycloakProvider authClient={keycloak}>
    <Provider store={store}>
      <App />
    </Provider>
  </ReactKeycloakProvider>
);
