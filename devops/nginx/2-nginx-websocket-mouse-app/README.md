# Nginx websocket for live mouse movement

## Client
check to see if node_modules is available, otherwise install the packages
to run the dev server: cd into client/ and do: pnpm dev

## Server
check to see if node_modules is available, otherwise install the packages
to run the dev server: cd into server/ and do: pnpm dev

## Answers
see all the answers in the .archive folder

## Task
- write a temporary shell script (temp-start.sh) to automate the following {
    server: install packages if no node_modules
    server: start the server
    client: install packages if no node_modules
    client: start the server
}
- create the Dockerfile for client, the exposed port from the app is: 5173
- create the Dockerfile for server, the exposed port from the app is: 9000
- create the nginx configuration file
- create the docker-compose file and tie together all of your services
- test your app and see that all is working properly
- when you're done
    - delete all the files that you created
    - node_modules, dockerfile, nginx.conf, docker-compose
    - use docker-compose down to remove all resources
    - verify that there are no dangling image, containers & networks