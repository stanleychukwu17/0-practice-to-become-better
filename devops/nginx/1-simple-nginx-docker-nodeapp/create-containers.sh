#!/bin/bash

# set -euo pipefail

names=("nodeapp1" "nodeapp2" "nodeapp3")
ports=(4000 4000 4000)

# loop through each name to create its docker container
for index in "${!names[@]}"; do
  name="${names[$index]}"
  port="${ports[$index]}"

  docker run -d --name "$name" --hostname "$name" 05 > /dev/null
done

echo "created all the docker containers: "
docker ps | grep -Ei "nodeapp1|nodeapp2|nodeapp3"

echo -e "\n"

for port in "${ports[@]}"; do
  # Set url
  url="http://localhost:${port}"

  # Get response by making a curl request to each of the containers
  response=$(curl -s -w "HTTP_STATUS:%{http_code}" "$url")
  # response might look like this: Hello World from Nodeapp2HTTP_STATUS:200

  # Extract body, see explanation 1.1 at the bottom of this script
  body=$(echo "$response" | sed -e 's/HTTP_STATUS:.*//g')

  # Extract status, see explanation 1.2 at the bottom of this script
  status=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')

  # Print response and status for each container
  echo "$url - status: $status - response: $body"
done;

# explanations 1.1
# body=$(echo "$response" | sed -e 's/HTTP_STATUS\:.*//g')
# sed -e 's/HTTP_STATUS\:.*//g': Removes the HTTP_STATUS: part and everything after it.
# e.g 
# Input: Hello from Node!HTTP_STATUS:200
# Output: Hello from Node!


# explanations 1.2
# status=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTP_STATUS://')
# tr -d '\n': Removes any newline that might separate body and status (in some curl outputs).
# sed -e 's/.*HTTP_STATUS://': Removes everything before and including HTTP_STATUS:, leaving just the status code.
# e.g:
# Input: Hello from Node!HTTP_STATUS:200
# Output: 200
