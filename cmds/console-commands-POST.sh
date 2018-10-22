#!/usr/bin/env bash

# Checkout git branch
git checkout 02-POST


# cURL commands


# Check current entries to compare results
curl -X GET http://localhost:3000/api/users

# Create new user
# email uses URL encoding for @ symbol
curl -X POST \
  http://localhost:3000/api/users/ \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d email=POST%40email.com

# Verify user was added
curl -X GET http://localhost:3000/api/users


# Verify invalid response handled correctly
curl -X POST \
  http://localhost:3000/api/users/ \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d invalid=invalid%40email.com
