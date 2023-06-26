#!/bin/bash

APP_ADMIN_ROLE_ID="2dadf489-b60d-438d-b902-7ab92f17c33a"
APP_USER_ROLE_ID="4738123a-3719-45cd-a778-f5b5b3bb68fd"
KEYCLOAK_URL="http://localhost:8080/auth"
ADMIN_CLIENT_ID="admin-cli"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin"
REALM_NAME="calendar-key-cloak"

# Function to import realm from realm-export.json
function import_realm() {
  local realm_file=$1

  echo "Importing realm from $realm_file"

  # Get access token
  access_token=$(curl -s -X POST "$KEYCLOAK_URL/realms/master/protocol/openid-connect/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "client_id=$ADMIN_CLIENT_ID" \
    -d "username=$ADMIN_USERNAME" \
    -d "password=$ADMIN_PASSWORD" \
    -d "grant_type=password" | jq -r '.access_token')

  # Import realm
  curl -s -X POST "$KEYCLOAK_URL/admin/realms" \
    -H "Authorization: Bearer $access_token" \
    -H "Content-Type: application/json" \
    --data-binary "@$realm_file"

  echo "Realm imported"
}


function create_user() {
  local username=$1
  local password=$2
  local roles=("${@:3}")

  echo "Creating user: $username"

  # Get access token
  access_token=$(curl -s -X POST "$KEYCLOAK_URL/realms/master/protocol/openid-connect/token" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "client_id=$ADMIN_CLIENT_ID" \
    -d "username=$ADMIN_USERNAME" \
    -d "password=$ADMIN_PASSWORD" \
    -d "grant_type=password" | jq -r '.access_token')

  # Create user
  curl -s -X POST "$KEYCLOAK_URL/admin/realms/$REALM_NAME/users" \
    -H "Authorization: Bearer $access_token" \
    -H "Content-Type: application/json" \
    -d '{
      "username": "'"$username"'",
      "enabled": true,
      "credentials": [
        {
          "type": "password",
          "value": "'"$password"'",
          "temporary": false
        }
      ]
    }'

  # Get user ID
  user_id=$(curl -s -X GET "$KEYCLOAK_URL/admin/realms/$REALM_NAME/users?username=$username" \
    -H "Authorization: Bearer $access_token" | jq -r '.[0].id')

  # Assign role mappings
  for role in "${roles[@]}"; do
    role_id=""
    case "$role" in
      "app-admin")
        role_id="$APP_ADMIN_ROLE_ID"
        ;;
      "app-user")
        role_id="$APP_USER_ROLE_ID"
        ;;
      *)
        echo "Invalid role: $role"
        ;;
    esac

    if [ -n "$role_id" ]; then
      curl -s -X POST "$KEYCLOAK_URL/admin/realms/$REALM_NAME/users/$user_id/role-mappings/realm" \
        -H "Authorization: Bearer $access_token" \
        -H "Content-Type: application/json" \
        -d '[{
          "id": "'"$role_id"'",
          "name": "'"$role"'",
          "composite": false,
          "clientRole": false,
          "containerId": "'"$REALM_NAME"'"
        }]'
      echo "Role '$role' assigned to user '$username'"
    fi
  done

  echo "User created: $username"
}

# Import realm from realm-export.json
import_realm "realm-export.json"

# Create users
create_user "user1" "user1" "app-user"
create_user "user2" "user2" "app-admin"
create_user "user3" "user3" "app-user" "app-admin"


