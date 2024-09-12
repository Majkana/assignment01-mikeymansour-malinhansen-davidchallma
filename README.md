<h3>Welcome to our automated testing for the hotel app!<h3><br />
We are using Playwright and TypeScript.<br />
Please add a .env file with correct data as per the .env-examples file.<br />
Depending on whether you have a local copy of the app or have pulled it from docker you run one of the following shell scripts to run the tests:<br />
run-tests.sh (for local copy)<br />
run-tests-docker.sh (for copy pulled from docker)<br />
Alternatively, YOU can start the hotel app on your own, and then run the tests via the script 'npm run testing' or 'npx playwright test'.<br />
If you choose the option to do it on your own, use script 'npm run test-report' or 'npx playwright show-report' to open the test report.