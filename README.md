[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/FadZhxrK)

Krzysztof Dąbrowski Projekt Bezpieczeństwo Aplikacji 2023

Jest to dodanie zabezpieczeń do projektu z zeszłego semestru

Aplikacja działa lokalnie keycloak ma volumen z danymi

Na początku należy wpisać komendę "npm install" w obu folderach "back-end" i "front-end"

Następnie w folderze w którym jest docker-compose należy wpisać komendę "docker-compose up"

Gdy Keycloak się załaduje pod adresem URL: http://localhost:8080/auth/

Należy w folderze keycloak odpalić skrypt createRealmAndUsers.sh komendą "bash createRealmAndUsers.sh"

W tym momencie zimportowany został Realm oraz stworzonych zostało 3 użytkowników.

Następnie w folderze "back-end" należy wpisać komendę "npm run dev", a w folderze "front-end" komendę "npm start".

Aplikacja będzie dostępna pod adresem URL: http://localhost:3000/

Logowanie do aplikacji:
    <ul>
        <li>1.login: user1 hasło: user1 //app-user</li>
        <li>2.login: user2 hasło: user2 //app-admin</li>
        <li>3.login: user3 hasło: user3 //app-user i app-admin</li>
    </ul>

User nie ma dostępu do wszystkich funkcji aplikacji, więc zalecam zalogować się na admina czyli "user2"