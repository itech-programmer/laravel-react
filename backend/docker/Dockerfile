# Используйте официальный образ PHP с необходимыми расширениями
FROM php:8.2-fpm

# Установка системных зависимостей и PHP расширений
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    git \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_mysql pdo_pgsql

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Установка рабочего каталога
WORKDIR /var/www/html

# Копирование файлов проекта
COPY . .

# Установка зависимостей проекта
RUN composer install --no-scripts --no-autoloader \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache \
    && chown -R www-data:www-data *

# Экспонирование порта
EXPOSE 9000

# Выполнение миграций и сидов перед запуском PHP-FPM
CMD ["sh", "-c", "php artisan migrate --seed && php-fpm"]
