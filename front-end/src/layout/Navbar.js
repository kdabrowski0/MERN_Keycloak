import React, { useEffect }  from "react";
import { Link, useNavigate } from "react-router-dom";
import GoToTop from "./GoToTop";
import { useKeycloak } from "@react-keycloak/web";
import "./Navbar.css";

const Navbar = () => {
  const { keycloak } = useKeycloak();
  const navigate = useNavigate()
  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <li>
            <ul>
              <Link className="navi" to="/home">
                Home
              </Link>

              <GoToTop />
            </ul>
            <ul>
              <Link className="navi" to="/Funinfo">
                Fun Info
              </Link>

              <GoToTop />
            </ul>
            <ul>
                <Link className="navi" to="/AddShoe">
                  Add Shoe
                </Link>

              <GoToTop />
            </ul>
            <ul>
              <Link className="navi" to="/userlist">
                User List
              </Link>
              <GoToTop />
            </ul>
            <ul>
            {keycloak.authenticated && (
              <button
                type="button"
                className="navi"
                title="Logout"
                onClick={() => { 
                  navigate("/");
                  keycloak.logout();
                  localStorage.setItem("token", "");
                }}
              >
                Logout ({keycloak.tokenParsed.preferred_username})
              </button>
            )}
            </ul>
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
