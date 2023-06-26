const session = require('express-session');
const Keycloak = require('keycloak-connect');
const keycloakConfig = require('./keycloak.json');

let keycloak;

function initKeycloak() {
    if(keycloak){
        return keycloak;
    }
    else{
        const memoryStore = new session.MemoryStore();
        keycloak = new Keycloak({ store: memoryStore, secret: "any_key", resave: false, saveUninitialized: true }, keycloakConfig);
        return keycloak;
    }
}

module.exports = {
    initKeycloak
};