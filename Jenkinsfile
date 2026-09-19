pipeline{
    agent any;
    stages{
        stage("Code"){
            steps{
                git url: "https://github.com/yash619garg/jmd-internship.git", branch: "master"
            }
        }
        stage("build"){
            steps{
                sh "docker build -t js-app:latest ."
            }
        }
        stage("test"){
            steps{
                echo "testing"
            }
        }
        stage("docker hub push"){
            steps{
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerHubCreds',
                        passwordVariable: 'dockerHubPass',
                        usernameVariable: 'dockerHubUser'
                     )]){
                     sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                     sh "docker image tag js-app:latest ${env.dockerHubUser}/js-app:latest"
                     sh "docker push ${env.dockerHubUser}/js-app:latest"
                }
            }
        }
        stage("Deploy"){
            steps{
                withCredentials([
                    file(
                        credentialsId: 'jmd-internship-env',
                        variable: 'ENV_FILE'
                    )
                ]) {
                    sh '''
                        docker compose --env-file "$ENV_FILE" up -d --build
                    '''
                }
            }
        }
    }
}
