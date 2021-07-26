#!/usr/bin/env bash

# setup git branch
git fetch --all
git branch --all
git checkout 01-GET



# cURL commands
curl -X GET http://localhost:3000/api/users


curl -X GET http://localhost:3000/api/users/1


