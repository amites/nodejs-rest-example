#!/usr/bin/env bash

# switch git branch
git checkout 04-DELETE

# cURL commands
# Check user data for current #2
curl -X GET http://localhost:3000/api/user/2


curl -X DELETE \
  http://localhost:3000/api/users/2


# verify user data has changed or not found
# only works this way with our "test" data structure
# otherwise should always be not found
curl -X GET http://localhost:3000/api/user/2
