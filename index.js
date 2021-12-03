const express = require('express');
const app = express();
const port = 3000;

const package = require('./package.json');

const health = require('@cloudnative/health-connect');
let healthCheck = new health.HealthChecker();

// Register a Liveness check
const livePromise = () => new Promise((resolve, _reject) => {
    const appFunctioning = true;
    // Change the above to a task to determine if your app is functioning correctly
    
    if (appFunctioning) {
        resolve();
    } else {
        reject(new Error("App is not functioning correctly"));
    }
});

let liveCheck = new health.LivenessCheck("LivenessCheck", livePromise);
healthCheck.registerLivenessCheck(liveCheck);

// Configure a Readiness liveCheck
let readyCheck = new health.PingCheck("google.com");
healthCheck.registerReadinessCheck(readyCheck);

// Register the endpoints
app.use('/live', health.LivenessEndpoint(healthCheck));
app.use('/ready', health.ReadinessEndpoint(healthCheck));
app.use('/healthz', health.HealthEndpoint(healthCheck));

app.get('/', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ Message: 'Hello World from Node.js', Version: `${package.version}` });
});

const server = app.listen(port, function () {
    console.log('Server %s running on port %s', package.version, port);
});