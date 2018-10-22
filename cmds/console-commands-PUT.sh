#!/usr/bin/env bash

# Checkout git branch
git checkout 03-PUT


# cURL commands

# Check current values for user
curl -X GET http://localhost:3000/api/users/2


# Modify existing user
# email uses URL encoding for @ symbol
curl -X PUT \
  http://localhost:3000/api/users/2 \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d email=updated%40email.com


# Verify user was updated
curl -X GET http://localhost:3000/api/users/2
