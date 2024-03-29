#include <Arduino.h>
#include "HX711.h"
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const int DOUT_PIN = D2;
const int SCK_PIN = D1;
const int orderId = 20;
const int deliveryId = 28;

const char* ssid = "se";
const char* password = "123456789";
const char* apiEndpoint = "http://192.168.255.153:8000/api/updateOrderWeight/";

HX711 scale;

char payload[50];  

void setup() {
  Serial.begin(115200);
  Serial.println("HX711 ESP8266 Demo");

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  scale.begin(DOUT_PIN, SCK_PIN);
}

void loop() {
  if (scale.is_ready()) {
    scale.set_scale();
    Serial.println("Tare... remove any weights from the scale.");
    delay(5000);
    scale.tare();
    Serial.println("Tare done...");

    long reading = scale.get_units(10);

    Serial.print("Weight: ");
    Serial.print(reading);
    Serial.println(" grams");

    sendWeightToAPI(reading, deliveryId, orderId);
  } else {
    Serial.println("Error: Unable to detect the HX711.");
  }

  delay(1000);
}


void sendWeightToAPI(long total_weight, int deliveryId, int orderId) {
  snprintf(payload, sizeof(payload), "{\"total_weight\":%ld,\"deliveryId\":%d}", total_weight, deliveryId);
  Serial.print("Sending payload: ");
  Serial.println(payload);

  String dynamicEndpoint = apiEndpoint + String(deliveryId) + "/" + String(orderId);

  WiFiClient client;  

  HTTPClient http;
  http.begin(client, dynamicEndpoint);
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(payload);

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String response = http.getString();
    Serial.print("Server response: ");
    Serial.println(response);
  } else {
    Serial.print("HTTP POST request failed. Error code: ");
    Serial.println(httpResponseCode);
    Serial.print("Error detail: ");
    Serial.println(http.errorToString(httpResponseCode).c_str());
  }

  http.end();
}