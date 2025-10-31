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

// 🔹 1. post { ... }

// The post block is used in Jenkins Declarative Pipelines to define actions that should occur after the stage or the entire pipeline completes, regardless of whether it succeeded, failed, or was aborted.

// You can have sections like:

// always { ... }

// success { ... }

// failure { ... }

// unstable { ... }

// aborted { ... }

// In this case, we are using success {} → only executes if the pipeline completes successfully.

// 🔹 2. success { ... }

// Defines steps that will run only when the build succeeds.

// Meaning: all preceding stages passed without errors.

// This is typically where we trigger deployments, notifications, or artifact archiving.

// 🔹 3. archiveArtifacts artifacts: 'dependency-check-report/*.*', allowEmptyArchive: true

// This is a Jenkins step used to save build outputs (artifacts) from the workspace into Jenkins for later viewing or download.

// Let’s break down the parameters:

// artifacts: 'dependency-check-report/*.*' → specifies which files/folders to archive.
// Here it archives all files inside the folder dependency-check-report/.

// allowEmptyArchive: true → prevents the build from failing if the specified folder doesn’t exist or is empty.

// ✅ Example use:
// If you used OWASP Dependency Check earlier to generate reports, this step ensures the resulting reports (.html, .xml, .json, etc.) are saved in Jenkins under the “Archived Artifacts” section for review.

// 🔹 4. build job: "Chat-App-CD", parameters: [ ... ]

// This line triggers another Jenkins job named "Chat-App-CD".
// This is commonly done to start a Continuous Deployment (CD) pipeline after the current Continuous Integration (CI) job finishes.

// Let’s break it down:

// Part	Description
// job: "Chat-App-CD"	The name of the downstream Jenkins job to trigger
// parameters: [...]	List of parameters to pass into the triggered job
// 🔹 5. string(name: 'FRONTEND_DOCKER_TAG', value: "${params.FRONTEND_DOCKER_TAG}")

// Passes a string parameter named FRONTEND_DOCKER_TAG to the triggered job.

// The value comes from the current pipeline’s parameter ${params.FRONTEND_DOCKER_TAG}.

// Example: If your Jenkins job was triggered with parameter FRONTEND_DOCKER_TAG = v1.0.0, this line sends that same value to the downstream deployment job.

// 🔹 6. string(name: 'BACKEND_DOCKER_TAG', value: "${params.BACKEND_DOCKER_TAG}")

// Same as above, but for your backend image tag.

// This is typically used when both frontend and backend Docker images are built and tagged separately in CI, then deployed together in the CD pipeline.
