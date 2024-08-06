import React from 'react'
import Footer from './Footer'

const Updates = () => {
    return (
        <>
            <div className="m-auto px-6 mb-5 sm:w-5/6 sm:py-2 sm:shadow-lg">

                <div className='flex space-x-3 mb-4 justify-center sm:mb-8'>
                    <strong className='text-2xl underline'> Important Updates:  </strong>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={28}><path d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75l-8.7 0-32 0-96 0c-35.3 0-64 28.7-64 64l0 96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-128 8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-147.6c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4L480 32zm-64 76.7L416 240l0 131.3C357.2 317.8 280.5 288 200.7 288l-8.7 0 0-96 8.7 0c79.8 0 156.5-29.8 215.3-83.3z" /></svg>
                </div>


                <div className='mb-2'>
                    <strong># Trivia games and Arcade Badges are live now! </strong>
                </div>

                <div className='mb-2'>
                    <strong># Arcade Cloud Digital Leader Challenge (1 to 5 August): </strong>
                    <a className='text-blue-500 hover:underline' href="https://github.com/CloudHustlers/Digital_Leader/tree/main" target="_blank" rel="noreferrer">Solution here</a>
                </div>

                <div className="mb-2">
                    <strong># List of all skill badges:  </strong>
                    <ul className='my-2 ml-9'>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/783">Manage Kubernetes in Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/646">Classify Images with TensorFlow on Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/623">Derive Insights from BigQuery Data</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/657">Share Data Using Google Data Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/676">Get Started with Google Workspace Tools</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/629">Migrate MySQL data to Cloud SQL using Database Migration Service</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/630">Use Machine Learning APIs on Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/759">Mitigate Threats and Vulnerabilities with Security Command Center</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/761">Monitor Environments with Google Cloud Managed Service for Prometheus</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/726">Get Started with Dataplex</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/663">Deploy Kubernetes Applications on Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/631">Prepare Data for ML APIs on Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/637">Set Up an App Dev Environment on Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/625">Develop your Google Cloud Network</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/648">Implement Load Balancing on Compute Engine</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/641">Set Up a Google Cloud Network</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/638">Build a Website on Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/640">Cloud Architecture: Design, Implement, and Manage</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/654">Build a Secure Google Cloud Network</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/627">Engineer Data for Predictive Modeling with BigQuery ML</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/716">Implement DevOps Workflows in Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/749">Monitor and Log with Google Cloud Observability</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/626">Create ML Models with BigQuery ML</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/624">Build a Data Warehouse with BigQuery</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/645">Implement Cloud Security Fundamentals on Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/741">Develop Serverless Applications on Cloud Run</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/649">Develop Serverless Apps with Firebase</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/655">Optimize Costs for Google Kubernetes Engine</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/628">Prepare Data for Looker Dashboards and Reports</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/661">Deploy and Manage Apigee X</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/684">Build and Deploy Machine Learning Solutions on Vertex AI</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/652">Create and Manage Cloud SQL for PostgreSQL Instances</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/639">Build LookML Objects in Looker</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/714">Develop and Secure APIs with Apigee X</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/651">Manage Data Models in Looker</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/644">Detect Manufacturing Defects using Visual Inspection AI</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/674">Automate Data Capture at Scale with Document AI</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/656">Perform Predictive Data Analysis in BigQuery</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/784">Protect Cloud Traffic with BeyondCorp Enterprise (BCE) Security</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/636">Build Infrastructure with Terraform on Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/643">Create and Manage Cloud Spanner Instances</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/776">Use Functions, Formulas, and Charts in Google Sheets</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/642">Create and Manage AlloyDB Instances</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/691">Implement CI/CD Pipelines on Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/650">Create and Manage Bigtable Instances</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/687">Build Google Cloud Infrastructure for AWS Professionals</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/688">Build Google Cloud Infrastructure for Azure Professionals</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/659">Store, Process, and Manage Data on Google Cloud - Command Line</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/653">Monitor and Manage Google Cloud Resources</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/632">Analyze BigQuery Data in Connected Sheets</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/658">Store, Process, and Manage Data on Google Cloud - Console</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/647">Get Started with Looker</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/635">App Building with AppSheet</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/662">Get Started with API Gateway</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/752">Streaming Analytics into BigQuery</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/696">Cloud Functions: 3 Ways</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/705">Create a Streaming Data Lake on Cloud Storage</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/725">Get Started with Cloud Storage</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/671">App Engine: 3 Ways</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/727">Get Started with Eventarc</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/728">Get Started with Pub/Sub</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/747">Monitoring in Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/634">Analyze Speech and Language with Google APIs</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/704">Create a Secure Data Lake on Cloud Storage</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/753">Tag and Discover BigLake Data</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/751">Secure BigLake Data</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/633">Analyze Images with the Cloud Vision API</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/750">Protect Sensitive Data with Data Loss Prevention</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/748">Networking Fundamentals on Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/754">The Basics of Google Cloud Compute</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/755">Use APIs to Work with Cloud Storage</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/756">Using the Google Cloud Speech API</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/715">Develop with Apps Script and AppSheet</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/667">Analyze Sentiment with Natural Language API</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/681">Build a Data Mesh with Dataplex</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/700">Cloud Speech API: 3 Ways</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/737">Integrate BigQuery Data and Google Workspace using Apps Script</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/702">Configure Service Accounts and IAM Roles for Google Cloud</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/686">Build Custom Processors with Document AI</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/959">Explore Generative AI with the Vertex AI Gemini API</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/984">Build LangChain Applications using Vertex AI</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/978">Develop GenAI Apps with Gemini and Streamlit</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/981">Inspect Rich Documents with Gemini Multimodality and Multimodal RAG</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/1076">Build Real World AI Applications with Gemini and Imagen</a></li>
                        <li className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href="https://www.cloudskillsboost.google/course_templates/976">Prompt Design in Vertex AI</a></li>
                    </ul>
                </div>


                <div className='mb-2'>
                    <strong className='flex justify-center font-extrabold italic'>Monsoon Season has been officially ended!</strong>
                </div>


            </div>
            <Footer />
        </>
    )
}

export default Updates
