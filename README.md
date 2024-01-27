<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> A mobile app is designed to facilitate the donation process of excess food wastes, connecting donors with delivery drivers, offering features like live tracking for donors. Complemented by a desktop admin panel, the system enhances food waste distribution, fostering a more sustainable and compassionate community.

## User Stories

### Donor:

- As a donor, I want to be able to track the live location of the delivery, so that I can stay updated about whether my order is received and donation completed or not yet.
- As a donor (individual, restaurant, or store), I want to donate excess food easily, so that I can contribute to reducing food waste in my community.
- As a donor, I want to be able to view all my current donation, so that I can easily keep track of my ongoing contributions and stay informed about the status of each donation (pending, on the way, or completed).
- As a donor, I want to be able to view my completed orders so that I can maintain a detailed record in my order history.
- As a donor, I want to be able to contact the delivery driver through his phone number, so I can inquire about the delivery status or provide additional instructions if needed.
- As a donor, I want to be able to chat with a AI bot specialized in answering questions about food waste donation, so I can inquire further about donations and receive answers to my queries.

### Delivery:

- As a delivery driver, I want to be able to accept an order, so that I ensure that the donor is promptly informed and the status of the donation order is promptly updated.
- As a delivery driver, I want to scan the QR code of the donor, so that the order status is updated.
- As a delivery driver, I want to be able to check the weight of the donated food using an IoT smart weight sensor, so that I can accurately verify the weight of the food waste donation before delivering it.
- As a delivery driver, I want to be able to view the current donation orders filtered by status (pending or on the way), so that I can easily keep track of my ongoing contributions.
- As a delivery driver, I want to be able to track the location of the order, so that I can efficiently navigate to the donor's location and pick up the order.
- As a delivery driver, I want to be able to call the donor so I can reach him for more details or inform him about any update.
- As a delivery driver, I want to be able to mark an order as completed, so that the donor is kept updated about the status of the order.
- As a delivery driver, I want to be able to revert a completed order back to "on the way", so that I can handle any unforeseen circumstances or issues during delivery.
- As a delivery driver, I want to be able to view my completed orders so that I can maintain a detailed record in my order history.
- As a delivery driver, I want to be able to cancel any order I have accepted, so that another delivery driver can take the order and deliver it.
- As a delivery driver, I want to check the weather temperature based on my current location, so that I can make informed decisions about the mode of transportation to use (e.g., motorcycle or car) for the delivery.

### Admin:

- As an admin, I want to be able to view real-time information about both users, so that I can monitor the system's performance.
- As an admin, I want to be able to approve registered delivery drivers, so that only authorized drivers can provide their services.
- As an admin, I want to be able to delete users, so that I can ensure the smooth functioning of the app's services.

<br><br>

<!-- Tech stacks -->
<img src="./readme/title3.svg"/>

### iDonate is built using the following technologies:

- This project uses the [React Native app development framework](https://reactnative.dev/). React Native is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.
- For persistent storage (database), the app uses the [MySQL](https://www.mysql.com/) package which allows the app to create a custom storage and save it to a local database.

### Wireframes

| Login screen                               | Register screen                          | Landing screen                           |
| ------------------------------------------ | ---------------------------------------- | ---------------------------------------- |
| ![Landing](./readme/wireframes/title1.png) | ![fsdaf](./readme/wireframes/title2.png) | ![fsdaf](./readme/wireframes/title3.png) |

| Login screen                             | Register screen                          | Landing screen                           |
| ---------------------------------------- | ---------------------------------------- | ---------------------------------------- |
| ![fsdaf](./readme/wireframes/title4.png) | ![fsdaf](./readme/wireframes/title5.png) | ![fsdaf](./readme/wireframes/title6.png) |

| Login screen                               | Register screen                          | Landing screen                           |
| ------------------------------------------ | ---------------------------------------- | ---------------------------------------- |
| ![Landing](./readme/wireframes/title7.png) | ![fsdaf](./readme/wireframes/title8.png) | ![fsdaf](./readme/wireframes/title9.png) |

| Login screen                                | Register screen                           | Landing screen                            |
| ------------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| ![Landing](./readme/wireframes/title10.png) | ![fsdaf](./readme/wireframes/title11.png) | ![fsdaf](./readme/wireframes/title12.png) |

| Login screen                                | Register screen                           | Landing screen                            |
| ------------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| ![Landing](./readme/wireframes/title13.png) | ![fsdaf](./readme/wireframes/title14.png) | ![fsdaf](./readme/wireframes/title15.png) |

| Login screen                                | Register screen                           | Landing screen                            | new screen                                |
| ------------------------------------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------------------- |
| ![Landing](./readme/wireframes/title16.png) | ![fsdaf](./readme/wireframes/title17.png) | ![fsdaf](./readme/wireframes/title18.png) | ![fsdaf](./readme/wireframes/title19.png) |

### Mockups

| Home screen                             | Menu Screen                           | Order Screen                          |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

<!-- Implementation -->
<img src="./readme/title4.svg"/>

> Using the wireframes and mockups as a guide, we implemented the Coffee Express app with the following features:

### User Screens (Mobile)

| Login screen                              | Register screen                         | Landing screen                          | Loading screen                          |
| ----------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |
| Home screen                               | Menu Screen                             | Order Screen                            | Checkout Screen                         |
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |

### Admin Screens (Web)

| Login screen                            | Register screen                       | Landing screen                        |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |
| Home screen                             | Menu Screen                           | Order Screen                          |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

<!-- Tech stack -->
<img src="./readme/title5.svg"/>

### iDonate is built using the following technologies:

- This project uses the React Native app development framework. React Native is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.

- For persistent storage (database), the app uses the MySQL package which allows the app to create a custom storage and save it to a local database.

<br><br>

<!-- How to run -->
<img src="./readme/title6.svg"/>
<br><br>

<!-- How to run -->
<img src="./readme/title7.svg"/>
<br><br>

<!-- How to run -->
<img src="./readme/title8.svg"/>
<br><br>

<!-- How to run -->
<img src="./readme/title9.svg"/>
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

In `iDonate-server`:

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

   <br>

Congratulations, The App Must be Working Now.

Some Installation may be different on different OS.
The app was never tested on an ios devices .

Enjoy your tour and please provide me with feedback. 🎉
