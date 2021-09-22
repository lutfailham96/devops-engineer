# Dev Ops
[![Build Status](https://jenkins.poseidon.my.id/buildStatus/icon?job=devops-engineer)](https://jenkins.poseidon.my.id/job/devops-engineer/)

## Table of Contents
- [Project Server URL](#production-server-url)
- [Jenkins Server URL](#jenkins-server-url)
- [How it works?](#how-it-works)
- [Project Structure](#project-structure)

## Production Server URL
```https://project.poseidon.my.id``` [Go to link](https://project.poseidon.my.id)

## Jenkins Server URL
```https://jenkins.poseidon.my.id``` [Go to link](https://jenkins.poseidon.my.id)

## How it works?
Every commit on this repository will be executing CI/CD Jenkins over GitHub webhook. Jenkins will doing testing over Jest and will automatically deploy the project to production Server if build was success.
```
Commits or Pull request => SCM checkout => Test project => Deploy project to production
```

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
 |--server.js           # App entry point
```
