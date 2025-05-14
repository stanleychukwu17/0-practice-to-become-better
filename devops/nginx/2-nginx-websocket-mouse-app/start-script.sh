#!/bin/bash

#--START BACKEND--
# backend
cd server

# checks if there already exist a node_modules folder
node_modules=$(ls | grep -o "node_modules")

# if there is no node_modules folder, install dependencies
if [ -z "$node_modules" ]; then
  pnpm install
fi

# start the backend server, Capture PID if needed: SERVER_PID=$!
pnpm dev &
#--END SERVER--


#--START FRONTEND--
# client
cd ../client

# checks if there already exist a node_modules folder
node_modules=$(ls | grep -o "node_modules")

# if there is no node_modules folder, install dependencies
if [ -z "$node_modules" ]; then
  pnpm install
fi

# start the client server, Capture PID if needed: CLIENT_PID=$!
pnpm dev &
#--END FRONTEND--


# Optional: wait for both processes (remove if you want the script to exit immediately)
wait