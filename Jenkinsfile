pipeline {
    agent any

    environment {
        APP_NAME = 'my-web-app'
        IMAGE_TAG = "my-web-app:${BUILD_NUMBER}"
        SERVICE_NAME = 'web-service'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Run Tests') {
            steps {
                sh 'node test.js'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${IMAGE_TAG} ."
            }
        }

        stage('Rolling Deploy') {
            steps {
                script {
                    // Check if Swarm service exists
                    def serviceExists = sh(script: "docker service ls -q -f name=${SERVICE_NAME}", returnStdout: true).trim()
                    
                    if (serviceExists) {
                        // Rolling update with 5s delay between tasks
                        sh "docker service update --image ${IMAGE_TAG} --update-parallelism 1 --update-delay 5s ${SERVICE_NAME}"
                    } else {
                        // Initial deployment with 2 replicas
                        sh "docker service create --name ${SERVICE_NAME} --replicas 2 --publish published=8080,target=3000 --env APP_VERSION=v${BUILD_NUMBER} ${IMAGE_TAG}"
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                sleep 5
                sh 'curl -f http://localhost:8080/health || exit 1'
            }
        }
    }
}

