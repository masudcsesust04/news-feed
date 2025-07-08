# Base image for PHP
FROM php:8.2-fpm as php

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    cron # Add cron here

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application directory contents
COPY . .

# Copy composer.lock and composer.json
COPY composer.lock composer.json ./

# Install dependencies
RUN composer install --no-ansi --no-dev --no-interaction --no-plugins --no-progress --no-scripts --optimize-autoloader

# Copy existing application directory permissions
COPY --chown=www-data:www-data . .

# Final image
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www

# Copy application files from php stage
COPY --from=php /var/www .

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
RUN chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Install cron in the final image
RUN apt-get update && apt-get install -y cron

# Add cron job for Laravel scheduler
# This cron job will run every minute and execute the Laravel scheduler
RUN echo "* * * * * www-data /usr/local/bin/php /var/www/artisan schedule:run >> /var/www/storage/logs/cron.log 2>&1" > /etc/cron.d/laravel-scheduler
RUN chmod 0644 /etc/cron.d/laravel-scheduler
RUN crontab /etc/cron.d/laravel-scheduler

# Expose port 9000 and start php-fpm server and cron
EXPOSE 9000
CMD ["sh", "-c", "cron -f & php-fpm"]