#!/bin/sh
echo Starting application...
sleep 2s
docker run --name hotelapp -d -p 3000:3000 my-vue-app
sleep 4s
echo Initiating test session...
sleep 2s
npm run testing
sleep 3s
echo Testing complete!
sleep 3s
echo Terminating application...
docker stop hotelapp
docker rm hotelapp
sleep 4s
echo Opening test report...
sleep 2s
npm run test-report