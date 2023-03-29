#include <ESP8266WiFi.h>
#include <FirebaseESP32.h>
//#include <FirebaseESP8266.h>
//#include <FirebaseArduino.h>


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
// To count the number of samples
// unsigned long startMillis;
// unsigned int sampleCount;
// unsigned int sampleRate;

int count = 0;


const int NUM_VALUES = 3;
int values[NUM_VALUES];
int numValues = 0;

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  // To count the number of samples
  // startMillis = millis();
  // sampleCount = 0;
}

// To delete graph values if they exceed a certain limit
// int graph_count = 0;

// Loop starts
void loop() {


  if (Serial.available() > 0) {
    String data = Serial.readStringUntil('\n');
    Serial.println(data);
    data.trim();

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
      if (count > 500) {
        Firebase.RTDB.setAsync(&firebaseData, id + "zzzgraph", NULL);
        count = 0;
      }



      //firebaseData.pushIntAsync(id+ "zzzgraph", graphVal);
      // graph_count++;
      // if(graph_count>=100){
      //   Firebase.set(id+"zzzgraph",NULL);
      //   graph_count=0;
      // }
      // To count the number of samples
      //  sampleCount++;
      //  if (millis() - startMillis >= 1000) {
      //   sampleRate = sampleCount;
      //   Serial.print("Sample rate: ");
      //   Serial.print(sampleRate);
      //   Serial.println(" samples per second");
      //   startMillis = millis();
      //   sampleCount = 0;
      // }
    }


    // // To send the calculated data values
    // else if (data.startsWith("*")) {
    //   data = data.substring(1);  // Remove the *
    //   int separatorIndex = data.indexOf("^");
    //   if (separatorIndex != -1) {
    //     String value1Str = data.substring(0, separatorIndex);
    //     data = data.substring(separatorIndex + 1);  // Remove the ^
    //     separatorIndex = data.indexOf("|");
    //     if (separatorIndex != -1) {
    //       String value2Str = data.substring(0, separatorIndex);
    //       String value3Str = data.substring(separatorIndex + 1);
    //       float value1 = value1Str.toFloat();
    //       float value2 = value2Str.toFloat();
    //       float value3 = value3Str.toFloat();
    //       Firebase.RTDB.setFloatAsync(&firebaseData, id + "spO2", value1);
    //       Firebase.RTDB.setFloatAsync(&firebaseData, id + "Heart Rate", value2);
    //       Firebase.RTDB.setFloatAsync(&firebaseData, id + "Heart Rate ECG", value3);
    //     }
    //   }
    // }

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