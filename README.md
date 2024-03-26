# React + TypeScript + Vite

Welcome to my Vite project! This project was bootstrapped with Vite, a fast frontend development build tool.

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running:

npm install

4. Start the development server:

npm run start

5. Open your browser and visit `http://localhost:5173` to view the app.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run start`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run serve`: Serves the production build locally.
- `npm run test`: Starts vitest unit tests.

## Cypress

To open interactive cypress environment for testing type `npx cypress open`.
There is also available non-interactive mode `npx cypress run`

## Docker

- Install Docker and Docker Compose:
  Ensure that Docker and Docker Compose are installed on your system. You can download and install Docker Desktop for your operating system from the official Docker website. Docker Desktop includes Docker Engine, Docker CLI client, and Docker Compose.

- Navigate to the Project Directory:
  Open a terminal or command prompt and navigate to the directory where your docker-compose.yml file is located. Use the cd command to change the directory.

- Once you are in the project directory, run the following command to start the Docker application:
  `docker-compose up --build`

docker-compose up starts the services defined in the docker-compose.yml file.
--build rebuilds the Docker images before starting the containers. This ensures that any changes made to the Dockerfile or application code are applied.

- Docker Compose will start building and then start the containers defined in the docker-compose.yml file. Wait for the process to complete. You should see output in the terminal indicating the status of each service.

- Once the containers are up and running, you can access your application as configured. This could involve opening a web browser and navigating to localhost or another address and port specified in your Docker configuration.

- To stop the Docker containers, you can press Ctrl + C in the terminal where docker-compose up is running. This will send a SIGINT signal to stop the containers gracefully.
