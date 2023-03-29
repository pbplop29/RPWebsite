// Importing libraries
#include <ESP8266WiFi.h>
#include <FirebaseESP32.h>

// To set the firebase parameters
#define FIREBASE_HOST "nodetest-66e6e-default-rtdb.asia-southeast1.firebasedatabase.app"
#define FIREBASE_AUTH "eWojpmCZJD4nLK6P8B9pHlSUrA55d3tXwkAWLUT5"
FirebaseData firebaseData;

//To set the network parameters
#define WIFI_SSID "pillow-share"
#define WIFI_PASSWORD "lollollollol"

// #define WIFI_SSID "DESKTOP-76OL0I9 0208"
// #define WIFI_PASSWORD "abcd1234"


// To set the id for user in Firebase
String idx = "NITxxx30";
String id = idx + "/";

// Count is for resetting firebase when a number of samples are sent
// NUM_VALUES is for the batch sending mechanism
int count = 0;
const int NUM_VALUES = 3;
int values[NUM_VALUES];
int numValues = 0;

// Setting the baud rate and establishing connections
void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

// Loop starts
void loop() {

  // If data is incoming
  if (Serial.available() > 0) {
    String data = Serial.readStringUntil('\n');
    Serial.println(data);
    data.trim();

    // If data is the PPG Waveform sample point
    if (data.startsWith("(") && data.endsWith(")")) {
      String graphString = data.substring(1, data.length() - 1);
      int graphVal = graphString.toInt();
      values[numValues++] = graphVal;
      if (numValues == NUM_VALUES) {
        int combined = values[0] * 1000000 + values[1] * 1000 + values[2];
        int signedValue = (int)combined;
        Firebase.RTDB.pushIntAsync(&firebaseData, id + "zzzgraph", signedValue);
        numValues = 0;
        count++;
        memset(values, 0, sizeof(values));
      }
      // Clearing the database on exceeding a number of samples
      if (count > 500) {
        Firebase.RTDB.setAsync(&firebaseData, id + "zzzgraph", NULL);
        count = 0;
      }

      // If the data is either SpO2, Heart Rate or Heart Rate ECG
    else if(data.startsWith("{") && data.endsWith("}")){
      String tempString = data.substring(1, data.length() - 1);
      float temp = tempString.toFloat();
      Firebase.RTDB.setFloatAsync(&firebaseData, id + "spO2", temp);
    }
    else if(data.startsWith("[") && data.endsWith("]")){
      String tempString = data.substring(1, data.length() - 1);
      float temp = tempString.toFloat();
      Firebase.RTDB.setFloatAsync(&firebaseData, id + "Heart Rate", temp);
    }
    else if(data.startsWith("^") && data.endsWith("^")){
      String tempString = data.substring(1, data.length() - 1);
      float temp = tempString.toFloat();
      Firebase.RTDB.setFloatAsync(&firebaseData, id + "Heart Rate ECG", temp);
    }
















  }
}