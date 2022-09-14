import groovy.json.*

/*
 * Collect all build until reach last successful build
 */
def lastSuccessfulBuild(passedBuilds, build) {
  if ((build != null) && (build.result != 'SUCCESS')) {
    passedBuilds.add(build)
    lastSuccessfulBuild(passedBuilds, build.getPreviousBuild())
  }
}

@NonCPS
def getLatestChangeSet(passedBuilds) {
  def changeSet = ""
  try {
    for (build in passedBuilds) {
      echo "${build}"
      if (build.changeSets.size() > 0) {
        for (entry in build.changeSets.last()) {
          echo "From this: ${build}"
          changeSet += "\u2022 ${entry.msg}\n"
        }
      }
    }
  } catch (err) {
    echo "Error get changeset: ${err}"
  }
  return changeSet
}

/**
 * Get latest build changes
 * @return String
 */
def getChangeSet() {
  def changeSet = ""
  try {
    changeSet = currentBuild.changeSets.last().collect { entry ->
      "\u2022 ${entry.msg}"
    }.join("\n")
  } catch (err) {
    echo "Error get changeset: ${err}"
  }
  return changeSet
}

/**
 * Get all latest build changes
 * @return String
 */
def getAllChangeSet() {
  return currentBuild.changeSets.collect { cs ->
    cs.collect { entry ->
      "\u2022 ${entry.msg}"
    }.join("\n")
  }.join("\n")
}

/**
 * Generate JSON request for Discord webhook
 */
def generateJson(String notificationType = 'report', String discordId = '') {
  def now = new Date().format("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", TimeZone.getTimeZone("UTC+7"))
  def notificationColor = '16711701'
  if (notificationType == 'approval') {
    notificationColor = '43775'
    env.jenkins_job_status = "WAITING_FOR_APPROVAL"
    env.jenkins_job_url = "${env.jenkins_blue_ocean_base_url}/${env.jenkins_job_name}/detail/${env.jenkins_branch_name}/${env.jenkins_job_number}/pipeline"
  } else if (env.jenkins_job_status == 'SUCCESS') {
    notificationColor = '65344'
  }
  def baseRequest = [
    content: "",
    username: "${env.discord_name}",
    avatar_url: "${env.discord_avatar_url}",
    embeds: [
      [
        title: "${env.jenkins_job_name}",
        color: "${notificationColor}",
        fields: [
          [
            name: 'Build Status',
            value: "${env.jenkins_job_status}"
          ],
          [
            name: 'Build Number',
            value: "#${env.jenkins_job_number}"
          ],
          [
            name: 'Jenkins Job URL',
            value: "[Jenkins ${jenkins_name}](${env.jenkins_job_url})"
          ],
          [
            name: 'Changes',
            value: "${env.jenkins_changes}"
          ],
          [
            name: 'Build Duration',
            value: "${env.jenkins_build_duration}"
          ],
        ],
        footer: [
          icon_url: "${env.discord_footer_icon_url}",
          text: "Generated from ${env.jenkins_node_name}"
        ],
        timestamp: "${now}",
      ],
    ],
  ]
  def generatedMention = ''
  if (discordId?.trim()) {
    for (id in discordId.split(',')) {
      generatedMention += "<@${id}> "
    }
    if (notificationType == 'approval') {
      baseRequest.content = "${generatedMention}"
    }
  }
  baseRequest = JsonOutput.toJson(baseRequest)
  //baseRequest = JsonOutput.toJson(baseRequest)

  return baseRequest
}

/**
 * Send build notification to Discord
 * Example:
 * - Notify build report                              : sendNotification()
 * - Notify build approval/confirmation               : sendNotification('approval')
 * - Notify build approval + mention PIC (Discord ID) : sendNotification('approval', '12345,5421')
 * @return void
 */
def sendNotification(String notificationType = 'report', String discordId = '') {
  try {
    env.discord_webhook_url = params.DISCORD_URL
    env.discord_id = "${discordId}"
    if (params.DISCORD_ID?.trim()) {
      env.discord_id = params.DISCORD_ID
    }
    env.discord_name = 'DevOps Bot'
    env.discord_avatar_url = 'https://i.postimg.cc/kgy6WqKc/download.jpg'
    env.discord_footer_icon_url = 'https://i.postimg.cc/kgy6WqKc/download.jpg'
    env.jenkins_branch_name = env.BRANCH_NAME
    env.jenkins_job_name = env.JOB_NAME.split('/')[0]
    env.jenkins_job_status = currentBuild.currentResult
    env.jenkins_job_number = currentBuild.number
    env.jenkins_job_url = env.BUILD_URL
    env.jenkins_notification_type = notificationType
    env.jenkins_node_name = env.NODE_NAME
    env.jenkins_build_duration = currentBuild.durationString
    env.jenkins_blue_ocean_base_url = 'http://localhost:8080/blue/organizations/jenkins'
    env.jenkins_name = 'System'
    def changes = '• N/A'
    def passedBuilds = []
    lastSuccessfulBuild(passedBuilds, currentBuild)
    def changeSet = getLatestChangeSet(passedBuilds)
    if (changeSet?.trim()) {
      changes = changeSet
    }
    env.jenkins_changes = changes
    env.json_request = generateJson(notificationType, discordId)
    sh """curl -H 'Content-Type: application/json' -d '${json_request}' '${discord_webhook_url}'"""
  } catch (err) {
    echo "Send notification to Discord was failed: ${err}"
  }
}


pipeline {
    parameters {
      string(name: 'DISCORD_ID', description: 'User ID of Discord', defaultValue: "")
      string(name: 'DISCORD_URL', description: 'Discord webhook URL', defaultValue: "")
    }
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
                  //sh 'thismustfailed'
                  sendNotification()
                }
            }
        }
    }
}

