# PSG Video API

This application is an API intended for managing YouTube video information across multiple channels, storing this in an SQL database.

## Getting started

Below you will find instructions for obtaining a copy of the project for development and testing purposes.

### Prerequisites

Here you will find all the links to the dependencies that are required to run this application.

* Docker
  * [Mac](https://docs.docker.com/docker-for-mac/)
  * [Windows](https://docs.docker.com/docker-for-windows/install/)
  * [Ubuntu](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [Docker compose](https://docs.docker.com/compose/install/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)

### Installation

Clone the repository from Git:
``` bash
  git clone git@github.com:petertonysmith94/psg-backend.git
```

Compile the assets:
``` bash
  yarn
  yarn build
```

Run the application:
``` bash
  docker-compose up
```

## Usage

Below you will find all the routes that are defined for this application, all are accessed via the following address: http://localhost.

Method  | Path                    | Description                                                                   |
------- | ----------------------- | ----------------------------------------------------------------------------- |
GET     | /channels               | Fetches all the channels within the database                                  |
GET     | /channels?query={query} | Searches the database for any channel values that match the {query}           |
GET     | /channels/{channel}     | Given an id {channel} will fetch a given resource                             |
DELETE  | /channels/{channel}     | Given an id {channel} will delete a given resource                            |
GET     | /videos                 | Fetches all the videos within the database                                    |
GET     | /videos?query={query}   | Searches the database for any video values that match the {query}             |
GET     | /videos/{video}         | Given an id {video} will fetch a given resource                               |
DELETE  | /videos/{video}         | Given an id {video} will delete a given resource                              |
POST    | /processes/update       | Stores channel and video data for the given channel names and filter strings  |
