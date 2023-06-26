import React, { useEffect } from "react";
import Home from "./layout/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditShoe from "./features/shoes/EditShoe";
import AddShoe from "./features/shoes/AddShoe";
import SingleShoePage from "./features/shoes/SingleShoePage";
import Prefetch from "./features/auth/Prefetch";
import Info from "./layout/Info";
import Layout from "./layout/Layout";
import Public from "./layout/PublicPage";
import ProtectedLayout from "./layout/ProtectedLayout";
import UserList from "./features/users/UserList";
import PrivateRoute from "./PrivateRoute";
import { useKeycloak } from "@react-keycloak/web";
import { useLoginMutation } from "./features/auth/authApiSlice";
import { useDispatch } from "react-redux";


function App() {
  const [login, { isLoading }] = useLoginMutation();
  const { keycloak, initialized } = useKeycloak();

  const loginKeycloak = async () => {
    try {
      localStorage.setItem("token", keycloak.token);
      await login({ username: keycloak.idTokenParsed.preferred_username });

    } catch (err) {
      console.log("error:", err);
    }
  };
  useEffect(() => {
    if (keycloak?.authenticated) {
      const token = keycloak.token;
      loginKeycloak();
    }
  
  }, [ keycloak.token]);



  return (
  <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Public />} />
                <Route element={<Prefetch />}>
                  <Route exact path="/" element={<ProtectedLayout />}>
                    <Route path="/home" element={<Home />} />
                      <Route exact path="/AddShoe" element={<PrivateRoute><AddShoe /></PrivateRoute>} />
                      <Route
                        exact
                        path="/editShoe/:id"
                        element={<PrivateRoute><EditShoe /></PrivateRoute>}
                      />
                      <Route path="/userlist" element={<PrivateRoute><UserList /></PrivateRoute>} />
                    <Route
                      exact
                      path="/shoes/:id"
                      element={<SingleShoePage />}
                    />
                    <Route exact path="/Funinfo" element={<Info />} />
                  </Route>
                </Route>
          </Route>
        </Routes>
      </Router>
  </div>
  );
}

export default App;
