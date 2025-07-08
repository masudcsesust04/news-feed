# News Feed Application API

This is the backend API for a news feed application, built with Laravel.

## About the Application

This application provides a set of APIs for a news feed application. It allows users to register, login, and manage their profile and settings. It also provides APIs for managing articles. Additionally, it includes a scheduled task to periodically fetch news articles from various external sources.

## Prerequisites

- Laravel 12 application
- PHP 8.1 or higher
- Composer installed
- News API keys configured in .env file

## Testing the Scheduler
## Step 1: Test Individual Commands
```bash
# Test each command individually first
php artisan fetch:news newsapi
php artisan fetch:news opennws
php artisan fetch:news newscred
```

### List All Scheduled Tasks
```bash
# See all your scheduled tasks
php artisan schedule:list
```

### Run Scheduler Once (Manual Test)
```bash
# This runs the scheduler once and executes any due tasks
php artisan schedule:run
```

## 2. Development/Testing Commands
### Run Scheduler Continuously (Development)
```bash
# This runs the scheduler every minute continuously (great for development)
php artisan schedule:work
```

## 3. Production Setup
### Add Cron Entry (Production)
For production, add this single cron entry to your server:
```bash
# Edit crontab
crontab -e

# Add this line (replace /path/to/your/project with actual path)
* * * * * cd /path/to/your/project && php artisan schedule:run >> /dev/null 2>&1
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

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/news-feed-app.git
    ```
2.  **Install dependencies:**
    ```bash
    composer install
    ```
3.  **Create a copy of the `.env.example` file and name it `.env`:**
    ```bash
    cp .env.example .env
    ```
4.  **Generate an application key:**
    ```bash
    php artisan key:generate
    ```
5.  **Run the database migrations:**
    ```bash
    php artisan migrate
    ```
6.  **Start the development server:**
    ```bash
    php artisan serve
    ```

## Dockerization

To build and run the application using Docker, follow these steps:

1.  **Build the Docker image:**
    ```bash
    docker build -t news-feed-app .
    ```
2.  **Run the Docker container:**
    ```bash
    docker run -p 8000:8000 news-feed-app
    ```
    Note: The Docker container will also run the Laravel scheduler via cron to fetch news articles periodically.
    ```

