def projectName = "frontend"
pipeline {
  agent {
    label 'dockerBuild'
  }
  stages {
    stage('Build the container image') {
      steps {  
          withCredentials([usernamePassword(credentialsId: '46cf2c18-710e-4795-a7cb-2274e067754c', passwordVariable: 'dockerPass', usernameVariable: 'dockerUser')]) {
            sh "docker build -t nexus.local.sliceup.co:443/${projectName}:${BUILD_NUMBER} ."
            sh "docker tag nexus.local.sliceup.co:443/${projectName}:${BUILD_NUMBER} nexus.local.sliceup.co:443/${projectName}:latest"
            sh "docker push nexus.local.sliceup.co:443/${projectName}:${BUILD_NUMBER}"
            sh "docker push nexus.local.sliceup.co:443/${projectName}:latest"
        }
      }
    }
  }
}

