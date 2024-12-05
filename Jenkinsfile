pipeline {
  agent any
  tools {
    // EN: We use the previously defined node installation. This adds node to the PATH as well
    // ES: Usamos la instalación de node definida antes. Esto además añade node al PATH
    nodejs 'node20'
  }
  environment {
    scannerHome = tool name: 'sonar-scanner'
  }
  stages {
    stage('Scan') {
      steps {
        withSonarQubeEnv(installationName: 'mySonar') { 
          sh '${scannerHome}/bin/sonar-scanner'
        }
      }
    }
    
    stage('Wait for quality Gate') {
      steps {
        timeout(time: 2, unit: 'MINUTES') {
            waitForQualityGate abortPipeline: true
        }  
      }
    }
  }
}
