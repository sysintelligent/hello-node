const express = require('express');
const app = express();
const port = 3000;

const health = require('@cloudnative/health-connect');
const healthcheck = new health.HealthChecker();

// This should be resolved once your app is up and running.
// The result will be checked every time you hit /ready endpoint.
const readyPromise = new Promise(resolve => {
    // This will make the app ready after 2 seconds for testing purposes.
    setTimeout(() => {
        console.log('READY!')
        resolve()
    }, 2000)
})

// Naming your check helps registering multiple checks and identifying the hanging ones.
healthcheck.registerReadinessCheck(new health.ReadinessCheck('testReadyCheck', readyPromise))

// Register the endpoints.
app.use('/ready', health.ReadinessEndpoint(healthcheck))
app.use('/healthz', health.LivenessEndpoint(healthcheck));

app.get('/', function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ Message: 'Hello World from Node.js', Version: 'v1.0.1' })
});

const server = app.listen(port, function () {
    console.log(`Server running on port ${port}`);
});