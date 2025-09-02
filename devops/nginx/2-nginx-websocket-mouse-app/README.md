# Nginx websocket for live mouse movement

## start both servers
- we need to start both servers to see if all is well
- use the ./start-script.sh

## Answers
see all the answers in the .archive folder

## Task
- create the Dockerfile for client, the exposed port from the app is: 5173
- create the Dockerfile for server, the exposed port from the app is: 9000
- create the nginx configuration file
- create the docker-compose file and tie together all of your services
- test your app and see that all is working properly
- when you're done
    - delete the node_modules folder
    - delete all the files that you created
    - dockerfile, nginx.conf, docker-compose
    - use docker-compose down to remove all resources
    - verify that there are no dangling image, containers & networks