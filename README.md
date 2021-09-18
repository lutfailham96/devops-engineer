# Dev Ops
[![Build Status](https://jenkins.poseidon.my.id/buildStatus/icon?job=devops-engineer)](https://jenkins.poseidon.my.id/job/devops-engineer/)

## Production Server URL
```https://project.poseidon.my.id```

## Jenkins Server URL
```https://jenkins.poseidon.my.id```

## How it works?
Every commit on this repository will be executed by CI/CD Jenkins by GitHub webhook. Jenkins will doing testing over Jest and will automatically deploy the project to production Server if build was success.

## Project Structure

```
nginx\
 |--custom\            # Nginx custom configuration
 |--sites-available\   # Sites configurations
 |--ssl\               # SSL configurations
src\
 |--controllers\       # Route controllers (controller layer)
 |--routes\            # Routes
 |--validations\       # Request data validation schemas
 |--app.js             # Express app
 |--index.js           # App entry point
```