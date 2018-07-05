# pet-cam-fg
Pet cam user that identifies authorized users and establishes connection to video feed. This project is intended to run alongside [pet-cam-aa](https://github.com/wongbros/automatic-adventure).

## Description
A web application that securely connects a user with their pet over web cam. A user can enter the email of the Google account used to log into [pet-cam-aa](https://github.com/wongbros/automatic-adventure) and a whitelisted phone number attached to that account. Once you click the Connect button, the web application will validate the information and produce a hashed URL to the video feed that will be texted to the whitelisted number.

Identifier
----
![](./docs/1-identifier.png)

Pet Video Feed
----
![](./docs/2-pet-video-feed.png)

## Team
  - [Brandon Wong](https://github.com/blhwong)
  - [Brian Wong](https://github.com/brianlwong)

## Table of Contents
1. [Technologies](#Technologies)
1. [Requirements](#Requirements)
1. [Tasks](#Tasks)
1. [Contributing](#contributing)

## Technologies

### Frontend
- React (ES6)
- React Router
- Ant Design
- Create react app
- Socket.io Client

### Backend
- Node
- Express

### Other
- Heroku
- Twilio

## Requirements
- Node 8.9.x
- React 16.4.x
- React Router DOM 4.2.x

## Setup
Begin by forking project. Clone down the forked repo:
```
git clone <your forked url>
```
cd to the root directory of the project
```
cd friendly-giggle/
```
install dependencies
```
npm install
```
start database
```
mongod
```
start client
```
npm run dev-client-https
```
Start hacking!

## Dotenv
Create .env file as shown below
```
PORT=
REACT_APP_SERVER_BASE
```

## Issues
View the project scrum board [here](https://github.com/orgs/wongbros/projects/1)

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
