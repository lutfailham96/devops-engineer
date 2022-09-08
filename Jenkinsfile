import groovyx.gpars.csp.plugAndPlay.GConsole

def lastSuccessfulBuild(passedBuilds, build) {
    if ((build != null) && (build.result != 'SUCCESS')) {
        passedBuilds.add(build)
        lastSuccessfulBuild(passedBuilds, build.getPreviousBuild())
    }
}

@NonCPS
def getChangeLog(passedBuilds) {
    def log = ""
    for (int x = 0; x < passedBuilds.size(); x++) {
        def currentBuild = passedBuilds[x];
        def changeLogSets = currentBuild.rawBuild.changeSets
        for (int i = 0; i < changeLogSets.size(); i++) {
            def entries = changeLogSets[i].items
            for (int j = 0; j < entries.length; j++) {
                def entry = entries[j]
                log += "* ${entry.msg} by ${entry.author} \n"
            }
        }
    }
    return log;
}

def getChangeSet() {
    return currentBuild.changeSets.collect { cs ->
        cs.collect { entry ->
            "* ${entry.author.fullName}: ${entry.msg}"
        }.join("\n")
    }.join("\n")
}

pipeline {
    agent none
    options {
        skipDefaultCheckout()
    }
    stages {
        stage('SCM Checkout') {
            agent {
                label 'master'
            }
            steps {
                checkout scm
                stash name: 'ws', includes: '**'
            }
        }
        stage('Get Changelog') {
            agent {
                label 'master'
            }
            steps {
                script {
                    log = getChangeSet()
                    echo "Log: ${log}"
                }
            }
        }
    }
}

