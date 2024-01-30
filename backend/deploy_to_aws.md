# Laravel Deployment Guide on Amazon Linux 2023

## Prerequisites

-   An Amazon Linux instance with SSH access.
-   Basic knowledge of Linux commands.
-   Familiarity with PHP and web development concepts.

## Step 1: Update Amazon Linux 2023 Packages

```bash
sudo dnf update
```

## Step 2: Install LAMP Stack

```bash
sudo dnf install httpd mariadb*-server php php-mysqlnd
```

## Step 3: Start and Enable Services

```bash
sudo systemctl enable --now httpd
sudo systemctl enable --now mariadb
```

## Step 4: Create Database

```bash
sudo mysql
CREATE DATABASE yourdb;
CREATE USER 'youruser'@'localhost' IDENTIFIED BY 'password';
GRANT ALL ON yourdb.* to 'youruser'@'localhost';
FLUSH PRIVILEGES;
quit;
```

## Step 5: Install PHP Composer

```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
sudo chmod +x /usr/local/bin/composer
```

## Step 6: Clone The Repo

```bash
cd /var/www
sudo dnf install git -y
sudo git clone https://github.com/GhadeerZahwe/iDonate.git
```

## Step 7: Install iDonate Byte

```bash
cd /var/www/iDonate
sudo chown -R $USER /var/www/iDonate
composer install
sudo chown -R apache.apache /var/www/iDonate
sudo chmod -R 755 /var/www/iDonate
sudo chmod -R 777 /var/www/iDonate/storage
```

## Step 8: Create the Laravel environment configuration file

```bash
sudo cp .env.example .env
sudo php artisan key:generate
sudo nano .env
```

## Step 9: Apache Configuration for PHP Laravel App

```bash
sudo nano /etc/httpd/conf.d/laravel.conf
sudo systemctl restart httpd
```

## Now the backend should be up and running
