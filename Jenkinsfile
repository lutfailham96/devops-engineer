pipeline {
    agent any
    stages {
        stage('SCM Checkout') {
            steps {
                sh '''#!/bin/bash
                   cd "/var/jenkins_home/workspace/devops-engineer"
                   git checkout -f main
                   git merge --ff-only origin/main
                '''
            }
        }
        stage('Test') {
            steps {
                echo 'Run unit tests from the source code'
                sh '''#!/bin/bash
                   cd "/var/jenkins_home/workspace/devops-engineer"
                   npm run test
                '''
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploy project to server'
                sh '''#!/bin/bash
                   cd "/var/jenkins_home/workspace/devops-engineer"
                   cp -apf ./* "/var/project/"
                '''
            }
        }
    }
}