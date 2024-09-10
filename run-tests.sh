#!/bin/sh
echo Starting the application...
sleep 1s
container_id=$(docker run -d -p 3000:3000 my-vue-app)
docker exec $container_id ls -la
sleep 2s
echo Initiating test session...
sleep 1s
echo Generating test data...
sleep 2s
echo Running tests...
sleep 1s
npm run testing random.spec.ts
sleep 7s
echo Terminating application...
docker stop $container_id
sleep 3s
echo Testing complete!