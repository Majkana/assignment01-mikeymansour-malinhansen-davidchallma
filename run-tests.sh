#!/bin/sh
echo Starting application...
sleep 2s
docker run --name hotelapp -d -p 3000:3000 my-vue-app
docker exec hotelapp ls -la
sleep 4s
echo Initiating test session...
sleep 2s
npm run testing random.spec.ts
sleep 3s
echo Testing complete!
sleep 2s
echo Terminating application...
docker stop hotelapp
docker rm hotelapp
sleep 3s
echo Opening test report...
sleep 2s
npm run test-report