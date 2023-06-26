import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute = ({ children }) => {
 const { keycloak } = useKeycloak();

 const isLoggedIn = keycloak.authenticated;
 const isAdmin = keycloak.hasRealmRole('app-admin');
 return isLoggedIn && isAdmin ? children : null;
};

export default PrivateRoute;