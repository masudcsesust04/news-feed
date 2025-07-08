# News Feed Application

This repository contains the source code for a full-stack news feed application, consisting of a React frontend and a Laravel backend API.

## Project Structure

- `frontend/`: Contains the React application.
- `backend/`: Contains the Laravel API.
- `nginx/`: Contains the Nginx configuration for the reverse proxy.
- `docker-compose.yml`: Defines the services for the application.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

To get the application up and running, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/news-feed-app.git
   cd news-feed-app
   ```

2. **Create an environment file:**

   Create a `.env` file in the root of the project and add the following environment variables. You can copy the example file from the backend directory and modify it.

   ```bash
   cp backend/.env.example .env
   ```

3. **Build and start the application:**

   ```bash
   docker-compose up -d --build
   ```

   This command will build the Docker images for the frontend, backend, and nginx services, and start the containers in detached mode.

4. **Access the application:**

   Once the containers are running, you can access the application in your browser at [http://localhost:8080](http://localhost:8080).

## Services

The `docker-compose.yml` file defines the following services:

- **`frontend`**: The React application, accessible at `http://localhost:5173`.
- **`backend`**: The Laravel API, accessible at `http://localhost:8000`.
- **`db`**: A PostgreSQL database for the backend.
- **`nginx`**: A reverse proxy that routes requests to the frontend and backend services.

## Additional Information

- The backend Laravel application includes a scheduler to fetch news articles periodically. This is configured to run within the `backend` Docker container.
- For more detailed information about the frontend and backend applications, please refer to the `README.md` files in their respective directories.
