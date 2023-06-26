import { useNavigate, Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import './PublicPage.css'
const Public = () => {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();
  if (!initialized) {
    return <div>Loading...</div>;
  }
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">My Page</span>
        </h1>
      </header>
      <div>Login or signup first before entering further</div>
      <li className="publiclist">
        <ul>
          {!keycloak.authenticated ? (
          <button
              className="button-78"
              onClick={() => keycloak.login()}
            >
            Login To Page
          </button>
          ) :(
            navigate("/home")
          )}
        </ul>
      </li>
    </section>
    
  );
  return content;
};
export default Public;
