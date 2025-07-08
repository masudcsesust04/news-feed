# News Feed Application API

This is the backend API for a news feed application, built with Laravel.

## About the Application

This application provides a set of APIs for a news feed application. It allows users to register, login, and manage their profile and settings. It also provides APIs for managing articles. Additionally, it includes a scheduled task to periodically fetch news articles from various external sources.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

*   **PHP**: Version 8.2 or higher.
*   **Composer**: For PHP dependency management.
*   **A Database System**: PostgreSQL
*   **News API Keys**: Obtain API keys for NewsAPI, OpenNews, and NewsCred.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/masudcsesust04/news-feed.git
    cd news-feed/backend
    ```
2.  **Install PHP Dependencies:**
    ```bash
    composer install
    ```
3.  **Environment Configuration:**
    Create a copy of the `.env.example` file and name it `.env`:
    ```bash
    cp .env.example .env
    ```
    Open the newly created `.env` file and configure your database connection details (DB_DATABASE, DB_USERNAME, DB_PASSWORD, etc.). Also, add your API keys for the news services:
    ```dotenv
    NEWSAPI_KEY=your_newsapi_key_here
    OPENNWS_KEY=your_opennws_key_here
    NEWSCRED_KEY=your_newscred_key_here
    ```
4.  **Generate Application Key:**
    ```bash
    php artisan key:generate
    ```
5.  **Database Setup:**
    Ensure the database specified in your `.env` file (e.g., `news-feed`) is created in your database management system. Then, run the migrations:
    ```bash
    php artisan migrate
    ```
6.  **Start the Development Server:**
    ```bash
    php artisan serve
    ```

## API Endpoints

### Authentication

-   `POST /api/signup`: User registration.
-   `POST /api/login`: User login.
-   `POST /api/logout`: User logout (requires authentication).

### Articles

-   `GET /api/articles`: List articles.
-   `POST /api/articles`: Create a new article.
-   `GET /api/articles/{article}`: Get a specific article.
-   `PUT/PATCH /api/articles/{article}`: Update an article.
-   `DELETE /api/articles/{article}`: Delete an article.

### Users

-   `GET /api/users/profile`: Get the authenticated user's profile.
-   `PATCH /api/users/profile`: Update the authenticated user's profile.
-   `PATCH /api/users/settings`: Update the authenticated user's settings.

## Development & Testing

### Running Tests

To run the feature tests for the API endpoints:

```bash
php artisan test --testsuite=Feature
```

### Scheduler Management

To manage and test the scheduled news fetching tasks:

*   **Test each command individually (if want)**
    ```bash
    php artisan fetch:news newsapi
    php artisan fetch:news opennws
    php artisan fetch:news newscred
    ```
    
*   **List All Scheduled Tasks:**
    ```bash
    php artisan schedule:list
    ```
*   **Run Scheduler Once (Manual Test):**
    This runs the scheduler once and executes any due tasks.
    ```bash
    php artisan schedule:run
    ```
*   **Run Scheduler Continuously (Development):**
    This runs the scheduler every minute continuously (great for development).
    ```bash
    php artisan schedule:work
    ```

### Production Setup

For production, add this single cron entry to your server:

```bash
# Edit crontab
crontab -e

# Add this line (replace /path/to/your/project with actual path)
* * * * * cd /path/to/your/project && php artisan schedule:run >> /dev/null 2>&1
```

## Dockerization

To build and run the application using Docker, follow these steps:

1.  **Build the Docker image:**
    ```bash
    docker build -t news-feed-backend .
    ```
2.  **Run the Docker container:**
    ```bash
    docker run -p 8000:8000 news-feed-backend
    ```
    Note: The Docker container will also run the Laravel scheduler via cron to fetch news articles periodically.