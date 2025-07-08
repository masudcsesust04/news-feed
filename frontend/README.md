# News Feed Application (Frontend)

This is the frontend repository for the News Feed Application, built with React and Tailwind CSS. It allows users to view news articles, manage their profile, and customize settings and preferences.

## Features

*   User authentication (Login, Register)
*   View news articles with filtering options (category, source, author, title)
*   User profile management
*   Edit user settings (theme, language, notifications, articles per page)
*   Edit user preferences (categories, sources, authors)

## Prerequisites

Before you begin, ensure you have met the following requirements:

*   Node.js (LTS version recommended)
*   npm (comes with Node.js) or Yarn

## Installation

To get a local copy up and running, follow these simple steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd news-feed-app/frontend
    ```
    (Replace `<repository_url>` with the actual URL of your repository)

2.  **Install NPM packages:**
    ```bash
    npm install
    # or if you use yarn
    # yarn install
    ```

## Running the Application

To run the application in development mode:

```bash
npm run dev
# or if you use yarn
# yarn dev
```

This will start the development server, usually at `http://localhost:5173`. The application will automatically reload if you make changes to the source code.

## Environment Variables

Create a `.env` file in the `frontend` directory based on the `.env.example` (if available) or the following:

```
VITE_API_BASE_URL=http://localhost:8000/api # Replace with your backend API URL
```
(Note: The `VITE_` prefix is required for environment variables to be exposed to your Vite-powered React app.)

## Docker Build and Run

To build the Docker image for this frontend application:

```bash
docker build -t news-feed-frontend .
```

To run the Docker container:

```bash
docker run -p 80:80 news-feed-frontend
```

This will start the application, accessible via your browser at `http://localhost`.
