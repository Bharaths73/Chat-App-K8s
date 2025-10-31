@Library('Shared') _
pipeline {
    agent any
    
    environment{
        SONAR_HOME = tool "Sonar"
        NVD_API_KEY = credentials('NVD-API')
    } 
//     SONAR_HOME = tool "Sonar"

// The tool directive tells Jenkins to locate the installation path of a tool that has been configured under
// “Manage Jenkins → Global Tool Configuration”.

// 🔹 tool "Sonar"

// "Sonar" is the name of a tool configured in Jenkins (typically the SonarQube Scanner).

// Jenkins will find the installation path of that tool and assign it to the variable SONAR_HOME.
    
    parameters {
        string(name: 'FRONTEND_DOCKER_TAG', defaultValue: '', description: 'Setting docker image for latest push')
        string(name: 'BACKEND_DOCKER_TAG', defaultValue: '', description: 'Setting docker image for latest push')
    }
    
    stages {
        stage("Validate Parameters") {
            steps {
                script {
                    if (params.FRONTEND_DOCKER_TAG == '' || params.BACKEND_DOCKER_TAG == '') {
                        error("FRONTEND_DOCKER_TAG and BACKEND_DOCKER_TAG must be provided.")
                    }
                }
            }
        }
        stage("Workspace cleanup"){
            steps{
                script{
                    cleanWs()
                }
            }
        }
        
        stage('Git: Code Checkout') {
            steps {
                script{
                    code_checkout("https://github.com/Bharaths73/Chat-App-K8s.git","main")
                }
            }
        }
        
        stage("Trivy: Filesystem scan"){
            steps{
                script{
                    trivy_scan()
                }
            }
        }

        stage("OWASP: Dependency check"){
            steps{
                script{
                    owasp_dependency()
                }
            }
        }
        
        stage("SonarQube: Code Analysis"){
            steps{
                script{
                    sonarqube_analysis("Sonar-Server","Chat-App","Chat-App")
                }
            }
        }

//      "Sonar-Server"
// The name of your SonarQube server configured in Jenkins under Manage Jenkins → Configure System → SonarQube Servers.
// Matches the value you used in withSonarQubeEnv("Sonar-Server") inside your shared function.

        
        // stage("SonarQube: Code Quality Gates"){
        //     steps{
        //         script{
        //             sonarqube_code_quality()
        //         }
        //     }
        // }
        
        // stage('Exporting environment variables') {
        //     parallel{
        //         stage("Backend env setup"){
        //             steps {
        //                 script{
        //                     dir("Automations"){
        //                         sh "bash updatebackendnew.sh"
        //                     }
        //                 }
        //             }
        //         }
                
        //         stage("Frontend env setup"){
        //             steps {
        //                 script{
        //                     dir("Automations"){
        //                         sh "bash updatefrontendnew.sh"
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        
        stage("Docker: Build Images"){
            steps{
                script{
                        dir('backend'){
                            docker_build("chat-app-backend","${params.BACKEND_DOCKER_TAG}","bharaths73")
                        }
                    
                        dir('frontend'){
                            docker_build("chat-app-frontend","${params.FRONTEND_DOCKER_TAG}","bharaths73")
                        }
                }
            }
        }
        
        stage("Docker: Push to DockerHub"){
            steps{
                script{
                    docker_push("chat-app-backend","${params.BACKEND_DOCKER_TAG}","bharaths73") 
                    docker_push("chat-app-frontend","${params.FRONTEND_DOCKER_TAG}","bharaths73")
                }
            }
        }
    }
    post{
        success{
           archiveArtifacts artifacts: 'dependency-check-report/*.*', allowEmptyArchive: true
            build job: "Chat-App-CD", parameters: [
                string(name: 'FRONTEND_DOCKER_TAG', value: "${params.FRONTEND_DOCKER_TAG}"),
                string(name: 'BACKEND_DOCKER_TAG', value: "${params.BACKEND_DOCKER_TAG}")
            ]
        }
    }
}
