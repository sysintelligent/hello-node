# hello-node
Node.js Hello World

## Install Dependencies

```
npm install
```

## Compile & Run

```
npm start
```

## Build the Docker image

```
docker build -t sysintelligent/hello-node .
```

## Publish the Docker image

```
docker push sysintelligent/hello-node:latest
```

## Health Probe

- Readiness endpoint: http://localhost:3000/ready
- Liveness endpoint: http://localhost:3000/live
- Health endpoint: http://localhost:3000/healthz