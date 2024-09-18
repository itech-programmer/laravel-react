# Project

## Description

This project consists of backend and frontend parts. The backend is built with PHP using Laravel, and the frontend is built with React.

## Installation and Setup

### 1. Prerequisites

Before starting, make sure the following tools are installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### 2. Cloning the Repository

First, clone your repository:

```sh
git clone https://github.com/itech-programmer/laravel-react.git
```
### 3. Project Structure

The project consists of two main components: backend and frontend. The directory structure is as follows:

```sh
.
├── backend/
│   ├── docker/
│   │   └── Dockerfile
│   ├── docker-compose.yml
│   └── ...
├── frontend/
│   ├── docker/
│   │   └── Dockerfile
│   ├── docker-compose.yml
│   └── ...
├── Makefile
└── README.md
```
### 4. Setup and Build

#### 4.1. Setting up and Building the Backend
Navigate to the backend directory and run the following command::

```sh
make backend-setup
```

#### 4.2. Setting up and Building the Frontend
Navigate to the frontend directory and run the following command:

```sh
make frontend-setup
```

### 5. Starting Containers
Start all containers with:

```sh
make up
```

### 6. Stopping and Removing Containers
To stop and remove all containers, run:

```sh
make down
```

### 7. Restarting Containers
To restart all containers, use:

```sh
make restart
```