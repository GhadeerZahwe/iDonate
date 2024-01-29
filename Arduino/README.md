### Arduino Food Weight Sensor

This Arduino project enables real-time tracking of food weight using an ESP8266 chip, an HX711 amplifier, and an EKT464885 load cell body scale sensor. The system periodically updates the weight of food donations for specific orders to a backend server. Below is a breakdown of the project components and functionality:

#### Components:

- **ESP8266 Chip:** Provides WiFi connectivity for data transmission.
- **HX711 Amplifier:** Facilitates precise weight measurements.
- **EKT464885 Load Cell Body Scale Sensor:** Retrieves real-time weight data.

#### Functionality:

1. **Initialization:** Establishes a WiFi connection to the designated network.
2. **Weight Measurement:** Utilizes the HX711 amplifier to measure the weight of food donations.
3. **Data Transmission:** Sends the measured weight data along with order and delivery IDs to the backend API endpoint.
4. **Periodic Updates:** Continuously monitors and updates the weight of food donations for orders at regular intervals.

#### Setup Instructions:

1. Connect the ESP8266, HX711, and load cell sensor according to the provided pin configuration.
2. Upload the Arduino sketch to the ESP8266 using the Arduino IDE.
3. Ensure the ESP8266 is connected to the designated WiFi network.
4. The system will automatically begin measuring and updating the weight of food donations to the backend server.

For detailed setup instructions and code explanations, please refer to the provided Arduino sketch and accompanying documentation.
