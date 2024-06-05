pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'node-hello-world'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside("-u root") {
                        // Crear directorio de cache de npm y darle permisos adecuados
                        sh 'mkdir -p /var/lib/jenkins/npm-cache'
                        sh 'chown -R $(whoami) /var/lib/jenkins/npm-cache'
                        // Configurar cache de npm
                        sh 'npm config set cache /var/lib/jenkins/npm-cache --global'
                        sh 'npm install'
                        sh 'npm test'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).run('-d -p 3000:3000')
                }
            }
        }
    }
}
