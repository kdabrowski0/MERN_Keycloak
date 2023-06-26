import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
 url: "http://localhost:8080/auth",
 realm: "calendar-key-cloak",
 clientId: "react-auth",
});

export default keycloak;