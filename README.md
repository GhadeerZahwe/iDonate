<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> A mobile app is designed to facilitate the donation process of excess food wastes, connecting donors with delivery drivers. Complemented by a desktop admin panel, the system enhances food waste distribution, fostering a more sustainable and compassionate community.

## User Stories

### Donor

- As a donor (individual, restaurant, or store), I want to donate excess food easily, so that I can contribute to reducing food waste in my community.
- As a donor, I want to be able to chat with an AI bot specialized in answering questions about food waste donation, so I can inquire further about donations and receive answers to my queries.
- As a donor, I want to be able to track the live location of the delivery, so that I can stay updated about whether my order is received and donation completed or not yet.

### Delivery

- As a delivery driver, I want to be able to check the weight of the donated food using an IoT smart weight sensor, so that I can accurately verify the weight of the food waste donation before delivering it.
- As a delivery driver, I want to scan the QR code of the donor, so that the order status is updated.
- As a delivery driver, I want to be able to call the donor so that I can reach him for more details or inform him about any update.
- As a delivery driver, I want to check the weather temperature based on my current location, so that I can make informed decisions about the mode of transportation to use (e.g., motorcycle or car) for the delivery.

### Admin

- As an admin, I want to be able to view real-time information about both users, so that I can monitor the system's performance.
- As an admin, I want to be able to approve registered delivery drivers, so that only authorized drivers can provide their services.
- As an admin, I want to be able to delete users, so that I can ensure the smooth functioning of the app's services.
  <br><br>

<!-- Tech stack -->
<img src="./readme/title3.svg"/>

### iDonate is built using the following technologies:

- This project uses the [React Native app development framework](https://reactnative.dev/). React Native is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.

- This project uses [Laravel framework](https://laravel.com/) for backend,Laravel serves as a backend framework for PHP web development, offering features and tools that streamline backend processes, such as routing, database management, authentication, and API development, empowering developers to build robust and scalable server-side applications efficiently.

- For persistent storage (database), the app uses the [MySQL](https://www.mysql.com/) package which allows the app to create a custom storage and save it to a local database.

- For location tracking, the app uses [Expo Location Library](https://docs.expo.dev/versions/latest/sdk/location/) which supports Android and iOS.

- This project uses third-party integration with [OpenAI](https://openai.com/) to empower AI-driven chat capabilities.

- For the IoT smart weight sensor that detects any change in the food weight value, the app utilizes
  the EKT464885 Load Cell Sensor, designed as a half-bridge body scale component, to accurately measure the weight of food in addition to the [ESP8266 Module](https://www.espressif.com/en/products/socs/esp8266), which employs [HTTPClient](https://www.arduino.cc/reference/en/libraries/httpclient/) to send requests and update the current food weight.

<br>

<!-- UI UX -->
<img src="./readme/title4.svg"/>

> We designed iDonate using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

### Mockups Examples

- Check more Mockups on Figma [figma](https://www.figma.com/file/jy1EGWm9adA8Ke0EZDEZ08/Final-Project?type=design&node-id=20%3A144&mode=design&t=Mo1Ua8LI1zp9k3Fe-1)

| Donor Main                                  | Add Donation                             | Donor Current Order                           | Delivery Current Orders                      |
| ------------------------------------------- | ---------------------------------------- | --------------------------------------------- | -------------------------------------------- |
| ![Landing](./readme/mockups/donor_home.svg) | ![fsdaf](./readme/mockups/add_order.svg) | ![fsdaf](./readme/mockups/current_orders.svg) | ![fsdaf](./readme/mockups/on_way_orders.svg) |

<br>

<!-- Database Design -->
<img src="./readme/title5.svg"/>

## ![Screenshot](./readme/screenshots/idonate_er.png)

<br><br>

<!-- Implementation -->
<img src="./readme/title6.svg"/>

### Gifs

| Add Donation                               | Track Order                       | Chat                             | Scan Order                       |
| ------------------------------------------ | --------------------------------- | -------------------------------- | -------------------------------- |
| ![Landing](./readme/demo/add_donation.gif) | ![fsdaf](./readme/demo/track.gif) | ![fsdaf](./readme/demo/chat.gif) | ![fsdaf](./readme/demo/scan.gif) |

| Check Weight                         | Delivery Current Orders               | Delivery Scan Screen                      | Check Current Temperature        |
| ------------------------------------ | ------------------------------------- | ----------------------------------------- | -------------------------------- |
| ![Landing](./readme/demo/weight.gif) | ![fsdaf](./readme/demo/delivery1.gif) | ![fsdaf](./readme/demo/scan_delivery.gif) | ![fsdaf](./readme/demo/temp.gif) |

### Videos

<table>
  <tr>
    <td align="center">
      
https://github.com/GhadeerZahwe/iDonate/assets/88279980/66bdc44e-d3c3-4c6d-a69f-88c4aba829ed

</td>
    <td align="center">
      
https://github.com/GhadeerZahwe/iDonate/raw/main/assets/88279980/6eb81002-c3e7-4482-9840-f2b373126767
</td>
    <td align="center">

https://github.com/GhadeerZahwe/iDonate/raw/main/assets/88279980/63e7e0b9-70ea-4ee8-96bd-1dd65439facf

</td>
  </tr>

  <tr>
    <td align="center">
      
https://github.com/GhadeerZahwe/iDonate/assets/88279980/9c977865-33f0-4a63-b382-76aa433578d5

</td>
    <td align="center">
      
https://github.com/GhadeerZahwe/iDonate/assets/88279980/bf08e5c6-5573-40f4-9fc9-d07152b0efaa
</td>
    <td align="center">

https://github.com/GhadeerZahwe/iDonate/assets/88279980/b44c1d1f-7f2e-4812-ab90-01f448705ce9

</td>
  </tr>
</table>

<!--


| Add Donation                               | Track Order                       | Scan Order                       |
| ------------------------------------------ | --------------------------------- | -------------------------------- |
| ![Landing](./readme/demo/add_donation.gif) | ![fsdaf](./readme/demo/track.gif) | ![fsdaf](./readme/demo/scan.gif) |

| Chat                               | Delivery Current Orders               | Check Weight                       |
| ---------------------------------- | ------------------------------------- | ---------------------------------- |
| ![Landing](./readme/demo/chat.gif) | ![fsdaf](./readme/demo/delivery1.gif) | ![fsdaf](./readme/demo/weight.gif) |

| Delivery Scan                               | Check Current Temperature        | Iot Smart Weight Sensor(Arduino)   |
| ------------------------------------------- | -------------------------------- | ---------------------------------- |
| ![Landing](./readme/demo/scan_delivery.gif) | ![fsdaf](./readme/demo/temp.gif) | ![fsdaf](./readme/demo/sensor.png) | -->

### User Screens (Mobile)

| Login screen                                | Register screen                           | Register Donor                            | Register Delivery                         |
| ------------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| ![Landing](./readme/screenshots/title1.jpg) | ![fsdaf](./readme/screenshots/title2.jpg) | ![fsdaf](./readme/screenshots/title3.jpg) | ![fsdaf](./readme/screenshots/title4.jpg) |

| Home screen                                 | Add Donation                              | Add Current Location                      | Current Orders                            |
| ------------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| ![Landing](./readme/screenshots/title5.jpg) | ![fsdaf](./readme/screenshots/title6.jpg) | ![fsdaf](./readme/screenshots/title7.jpg) | ![fsdaf](./readme/screenshots/title8.jpg) |

| Donor Current Orders                        | Completed Orders                           | ChatBot Screen                             | Settings screen                            |
| ------------------------------------------- | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| ![Landing](./readme/screenshots/title9.jpg) | ![fsdaf](./readme/screenshots/title10.jpg) | ![fsdaf](./readme/screenshots/title12.jpg) | ![fsdaf](./readme/screenshots/title11.jpg) |

| Track Location screen                        | Delivery Pending                           | Delivery On The Way                        | Check Weight                               |
| -------------------------------------------- | ------------------------------------------ | ------------------------------------------ | ------------------------------------------ |
| ![Landing](./readme/screenshots/title13.jpg) | ![fsdaf](./readme/screenshots/title14.jpg) | ![fsdaf](./readme/screenshots/title16.jpg) | ![fsdaf](./readme/screenshots/title20.jpg) |

### Admin Screens (Web)

| Login screen                                | Donor Screen                                   |
| ------------------------------------------- | ---------------------------------------------- |
| ![Landing](./readme/screenshots/admin1.jpg) | ![fsdaf](./readme/screenshots/admin_donor.jpg) |

### Arduino (Smart Weight Sensor)

The Arduino IoT weight sensor system includes components like an ESP8266 chip for WiFi connectivity, an HX711 amplifier for accurate weight measurements, and an EKT464885 load cell body scale sensor for real-time weight data retrieval. Integrating these modules on a breadboard and programming them using the Arduino IDE, we've created a reliable sensor weight. The system consistently updates the weight of food donations for orders to the backend.

For a more detailed understanding of the Arduino setup and code intricacies, please refer to the comprehensive documentation: [Smart Weight Sensor](./Arduino/README.md).

| Smart Weight Sensor
| -----------------------------------------
| ![Smart Weight Sensor ](./readme/demo/weight_sensor.jpg)

<table>
<tr>
 <td align="center">

https://github.com/GhadeerZahwe/iDonate/assets/88279980/307bf0a0-9225-4816-a3d3-64965d8faea0

</td>
  </tr>
</table>
<!-- Prompt Engineering -->

### Prompt Engineering:

In this project, I leverage OpenAI's powerful natural language processing capabilities to develop an AI chatbot dedicated to assisting donors with inquiries related to food donation. The chatbot intelligently responds to user prompts, providing information and guidance on various aspects of food donation, waste reduction, and community support.

The chatbot incorporates sophisticated prompt engineering techniques to ensure contextually relevant and informative responses. By constructing detailed prompts that encapsulate user intent and conversational context, the chatbot effectively guides the AI model to provide tailored answers that align with the user's needs and preferences.

Key Features:

1- Keyword Recognition: The chatbot identifies relevant keywords related to food donation, waste, and community support to trigger appropriate responses.

2- Dynamic Interaction: Continuously updating prompts based on the conversation history allows the chatbot to maintain a natural and engaging dialogue flow with the user.

3- Role Specification: Clear definition of the chatbot's role as a donor assistance AI ensures that responses are aligned with the user's expectations and the context of the conversation.

This OpenAI donor chatbot enhances the user experience by providing valuable information and guidance on food donation-related inquiries, empowering donors to make a positive impact on their communities. For further details on the chatbot's functionality and implementation, please refer to the provided code.

| OpenAi prompt screen
| ------------------------------------------
| ![Home ](./readme/openAi.png)

<br><br>

<!-- AWS Deployment -->
<img src="./readme/title8.svg"/>

## AWS Integration:

- This project is deployed to Amazon Linux 2023 backend, by using the following steps :

1. Update Amazon Linux 2023 Packages
2. Install LAMP Stack
3. Start and enable the Apache and MariaDB services
4. Create Database
5. Install PHP Composer for Laravel on on Linux 2023
6. Download the Laravel framework project
7. Install Laravel on Amazon Linux 2023
8. Create the Laravel environment configuration file
9. Apache Configuration for PHP Laravel App
10. Get the Laravel demo page

Here are the AWS deployment commands I used to deploy my Laravel server:

1. Update Amazon Linux 2023 Packages:

   ```sh
   sudo dnf update
   ```

2. Install LAMP Stack (Linux, Apache, MySQL, PHP):

   ```sh
   sudo dnf install httpd mariadb*-server php php-mysqlnd
   ```

3. Start and Enable the Apache and MariaDB Services:

   ```sh
   sudo systemctl enable --now httpd
   sudo systemctl enable --now mariadb
   ```

4. LogIn to MySWL and CREATE Database:

   ```sh
    sudo mysql
    CREATE DATABASE yourdb;
    CREATE USER 'youruser'@'localhost' IDENTIFIED BY 'password';
    GRANT ALL ON yourdb.* to 'youruser'@'localhost';
    FLUSH PRIVILEGES;
    quit;
   ```

5. Install PHP Composer for Laravel on Amazon Linux 2023:

   ```sh
   curl -sS https://getcomposer.org/installer | php
   sudo mv composer.phar /usr/local/bin/composer
   sudo chmod +x /usr/local/bin/composer
   ```

6. Clone the Laravel Project:

   ```sh
   cd /var/www
   sudo dnf install git -y
   sudo git clone RepoLink
   ```

7. Give Permission to Your Current to Access the Laravel Folder:

   ```sh
   cd /var/www/RepoNameLaravel
   sudo chown -R $USER /var/www/laravel
   ```

8. Install Laravel on Amazon Linux 2023:

   ```sh
   composer install
   sudo chown -R apache.apache /var/www/laravel
   sudo chmod -R 755 /var/www/laravel
   sudo chmod -R 777 /var/www/laravel/storage
   ```

9. Create the Laravel Environment Configuration File:

   ```sh
   sudo cp .env.example .env
   sudo php artisan key:generate
   sudo nano .env
   ```

10. Go to the Database Section and Change the Values:

    ```sh
    Database Name
    Database Username
    Database Password
    Save the file using Ctrl+O, hit the Enter key, and then exit the file using Ctrl+X.
    ```

11. Apache Configuration for PHP Laravel App:

    ```sh
    sudo nano /etc/httpd/conf.d/laravel.conf
    ```

12. Add the Following Lines:

    ```sh
     <VirtualHost *:80>
        ServerName laravel.example.com
        DocumentRoot /var/www/laravel/public

        <Directory /var/www/laravel>
               AllowOverride All
        </Directory>
      </VirtualHost>
    ```

13. Restart the Apache:

    ```sh
    sudo systemctl restart httpd
    ```

14. Get Access to Your IP:
    ```sh
    curl ipinfo.io
    ```
    You will receive a list of details about your server. 'ip' is the IP adress of your new server. You can access it in the url of your browser.

NOTE: To access Laravel's Server APIs, use the following IP address: 80.79.145.161/api
<br><br>

> For more details, check [Backend](./backend/deploy_to_aws.md)

<br>

<!-- Unit Testing -->
<img src="./readme/title9.svg"/>

- This project employs rigorous unit testing methodologies to ensure the reliability and accuracy of code components. By systematically evaluating individual units of the software, we guarantee a robust foundation, identifying and addressing potential issues early in the development process.

![Screenshot](./readme/screenshots/feature_tests.png)
<br><br>

<!-- How to run -->
<img src="./readme/title10.svg"/>

> To set up iDonate locally, follow these steps:

### Prerequisites

- Install NPM from: [NPM](https://nodejs.org/en/download)

- Install composer from: [Composer](https://getcomposer.org/download)

- Database server: Any Apache HTTP Server, MariaDB database server, recommended [XAMPP](https://www.apachefriends.org)
  This is an example of how to list things you need to use the software and how to install them.

## Installation

### First, Cloning and Installing Packages

_Below are the steps to follow to run the project_

1. Clone the repo
   ```sh
   git clone https://github.com/GhadeerZahwe/iDonate.git
   ```
2. Install NPM packages for admin by opening terminal in `electron` and run
   ```sh
   npm install
   ```
3. Install NPM packages for user react native by opening terminal in `frontend` and run
   ```sh
   npm install
   ```
4. Install Composer packages for server by opening terminal in `backend` and run
   ```sh
   composer install
   ```
   Or if error occurs
   ```sh
   composer update
   ```

### Second, let's start the server

In `backend`:

1. Copy `.env.example` file and rename it `.env` you can run
   ```sh
   cp .env.example .env
   ```
2. Open your `.env` file and change the database name (DB_DATABASE) to whatever you need or to `idonate_db`, username (DB_USERNAME) and password (DB_PASSWORD) field correspond to your configuration if you configured them.

3. Run the following command for laravel ,JWT and Database (you must have your XAMPP server running)

   ```sh
      php artisan key:generate
   ```

   ```sh
      php artisan jwt:secret
   ```

   ```sh
      php artisan migrate
   ```

   ```sh
      php artisan storage:link
   ```

   ```sh
      php artisan serve --host <YOUR_LOCAL_IPv4@> --port 8000
   ```

   you can get your IPV4@ by running

   on windows

   ```sh
      ipconfig
   ```

   on linux

   ```sh
      ifconfig
   ```

### Now the Admin part

Go to `electron`:

1. IN `\src\hooks\http-hook.js` change IP to you IPV4@ or server IP@

   ```js
   URL = "SERVER_IP@/api/ony";
   ```

2. In The Terminal Run

   ```sh
     npm start
   ```

   ### Finally for User Application

In `frontend` :

1. Copy "or Create" `.env.example` file and rename it `.env` you can run
   ```sh
   cp .env.example .env
   ```
2. Add Server IP@ /Link
   ```js
      BASE_URL=<SERVER_IP>/api/ony
   ```
3. In `\hooks\request.js` change IP to you IPV4@ or server IP@

   ```js
   const URL = "SERVER_IP@/api/ony";
   ```

4. In The Terminal Run

   ```sh
     npx expo start
   ```

Congratulations, The App Must be Working Now.

Some Installation may be different on different OS.
The app was never tested on an ios devices .

Enjoy your tour and please provide me with feedback. 🎉
