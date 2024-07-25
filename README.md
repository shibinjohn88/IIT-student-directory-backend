# Student Directory Backend 

Backend to serve web api requests for Student Directory Web Application

## Development

Application is written in nodejs using express framework.

## Continous Deployment

Application is deployed to AWS Elastic Beanstalk using github actions. Whenever there is a push to master branch application will be automatically deployed to Elastic Beanstalk.
.github/eb.yml is the github action workflow file used for continous deployment. 

## Container

Application uses docker container. Dockerfile and docker-compose.yml is used to make a docker container. 

## Database

Database used for this application is an AWS RDS PostgreSQL. 

## Web API 

URL: http://abcstudentdirectory.us-east-1.elasticbeanstalk.com:3000

### Endpoints
GET /api/students: get all students records
POST /api/students: create a student record
GET /api/students/studentid: get a specific student record
DELETE /api/students/studentid: delete a student record
PUT /api/students/studentid: edit a student record






