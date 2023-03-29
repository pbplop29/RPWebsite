# Overview

This project is a system that uses an SpO2 sensor connected to an Arduino Mega to obtain the PPG waveform. The waveform is then processed to determine the SpO2 value and heart rate, which are sent to an ESP-32. The ESP-32 is programmed to be linked to a Firebase database and updates the collections with the obtained data. A website is also included in the project, which is built using React and is connected to the Firebase database. The website extracts and displays the information obtained from the sensor. SpO2, Heart Rate from SpO2, Heart Rate from ECG and PPG waveform samples are updated in the database and are displayed in the website where the PPG waveform can be observed in realtime with a sampling rate of 10 samples per second.

# Contents

    1. Database
        a) Creating the database
        b) Information to be extracted
        c) Fingerprints
    2. Arduino
        a) Interfacing
        b) Arduino Mega
        c) ESP-32
    3. Website
        a) Setting up Website and Installing dependencies
        c) Linking Firebase
        d) Retrieving data
        e) Display

# Database

<span style="font-size:25px;">Firebase</span> is a development platform that provides authentication, hosting, cloud functions, storage, and database services. Its Realtime Database is a NoSQL database that enables real-time data storage and synchronization between clients, with support for Android, iOS, and web apps. It uses a JSON data format, offers offline support, security rules, and easy integration with other Firebase services. The database can be accessed using Firebase SDK, REST API, or the Firebase console.

## _Creating the database_

- Create firebase account.
- Go to firebase console.
- Create a new project (Give project name, and server locations).
- Click on build and select Realtime Database.
- Add website or webapp in the menu.
- Create the database and go to the rules and setup the rules to give access to read and write.
- You can now create a collection with fields you want which will serve as your database.
- For our context, the database looks as follows.
  ![Databse Overview](https://i.ibb.co/60NpvT0/brave-o67fz-LHzz-L.png)

## _Information to be extracted_

- Go to project settings.
- Go to General.
- Scroll down to the website or webapp panel.
- Copy the firebase configuration details wihch will be needed when we will connect the database to React Website. It looks like:

```js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "☆☆☆☆☆☆☆☆☆☆☆☆☆",
  authDomain: "☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆",
  databaseURL: "☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆",
  projectId: "☆☆☆☆☆☆☆☆☆☆☆",
  storageBucket: "☆☆☆☆☆☆☆☆☆☆☆☆☆",
  messagingSenderId: "☆☆☆☆☆☆☆☆☆☆☆☆",
  appId: "☆☆☆☆☆☆☆",
  measurementId: "☆☆☆☆☆☆☆☆☆☆☆",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

## _Fingerprints_

Fingerprint of the realtime database will be crucial in connecting to the ESP-32 module. It will be needed to be input in the file present at path **_"Documents\Arduino\libraries\firebase-arduino-master\src"_** called **_FirebaseHttpClient.c_**. This will help establish and secure the connection.

Fingerprint will look something like:

```js
C3:FB:91:85:CC:6B:4C:7D:E7:18:ED:D8:00:D2:84:E7:6E:97:06:07
```

The fingerprints can be acquired in the following ways. Please try all the ways till you find the one that works for you.

### _Method-1_

- Visit the site **_"https://www.grc.com/fingerprints.htm"_**
- Paste the link to your Realtime database
- Generate fingerprint and copy it.

### _Method-2_

- Visit the site ***https://github.com/FirebaseExtended/firebase-arduino/pulls***
- Among the pull requests find the latest one and copy it.

### **_Method-3_**

- Go to your Realtime database in the console.
- Click the lock icon on the top present near the site URL.
- Click on it and click on **_Connection is Secure_**
- Click on **_Certificate is valid_** and copy the fingerprints from the bottom.

  ![Fingerprint](https://i.ibb.co/NWn1yrX/IRDa-QGmi-JV.png)
  <br>
  ![Fingerprint](https://i.ibb.co/mS8psZf/LRBs-Kl2fng.png)
  <br>
  ![Fingerprint](https://i.ibb.co/kDC6fFK/brave-N6-Mvgx-XJEp.png)
  <br>

# Arduino

## **_Interfacing_**

We have used Arduino Mega as the main computing block. An ESP-32 module is connected to it for providing internet access and operations. A Nellcor DS-100A probe is used for SpO2 measurement. An AD8232 module is used for the ECG measurement.
The block diagram of the whole interface looks like:
<br>
![Block Diagram](https://i.ibb.co/BKzXg7h/brave-6lnry-WVDGH.png)

If more information on hardware, principles and interfacing is needed, please refer to the following paper:

> A. Singh, S. K. Kar and V. K. Sinha, "Real-time Voltage Mode Pulse Oximetry System," 2022 IEEE 19th India Council International Conference (INDICON), Kochi, India, 2022, pp. 1-6, doi: 10.1109/INDICON56171.2022.10039890.
> **_"https://ieeexplore.ieee.org/document/10039890"_**.

## **_Arduino Mega_**

- Well, we start with the assumption that you already know how to compile, verify and upload the arduino code. Please go through some youtube tutorials, or arduino documentation to know about this.
- A few things to consider will be usb drivers, arduino create agent.

- The codes will be found in the github repository. Please copy the code into a main.ino file that distinguishes the Arduino Mega code.

### Installing dependencies

- Please install all the libraries that are asked for by the Arduino IDE.
- The libraries can either be found by compiling and through errors or at the top of the file where they are included as:

```ino
#include <SPI.h>
#include "Adafruit_GFX.h"
#include <MCUFRIEND_kbv.h>
```

### Setup and data processing

- Libraries being included and the variables being declared before setup are easy to understand, and yet there will be comments alongside to understand.
- Make sure the baud rate is set to **_115200_** in the **_void setup()_** function.
- In the **_void loop()_** function lies our majority of the code.
- We use analogRead() to read the pin values, and track time using millis().
- The values read and the time periods are used to calculate the SpO2 and Heart Rate.

### Sending data to ESP-32

- The following snippet is used to send the PPG sample points to the ESP-32.

```ino
  Serial.print("(");
  Serial.print(sensor_ir_ac);
  Serial.println(")");
  delay(100);
```

- Notice that there is a delay of 100 ms after each sample point is sent, that is because the ESP-32 won't be able to process data being updated faster than this at a medium-fast internet connection due to issues like RTT, latency, etc. Hence 10 samples/second is maintained to accomodate to the ESP-32 capabilities.

- The following snipper is used to send the SpO2, Heart Rate and Heart Rate ECG values to the ESP-32.

```ino
  Serial.print("{");
  Serial.print(spo);
  Serial.println("}");
  delay(100);
  Serial.print("[");
  Serial.print(heart_rate);
  Serial.println("]");
  delay(100);
  Serial.print("^");
  Serial.print(heart_rate_ecg);
  Serial.println("^");
  delay(100);
```

## _ESP-32_

- The codes will be found in the github repository. Please copy the code into a esp.ino file that distinguishes the ESP-32 code.

### Installing dependencies

- Please install all the libraries that are asked for by the Arduino IDE.
- The libraries can either be found by compiling and through errors or at the top of the file where they are included as:

```ino
#include <ESP8266WiFi.h>
#include <FirebaseESP32.h>
```

- Please use version 4.3.7 for the FirebaseESP32 library from the library manager or the code may not work due to version mismatch.
- Go to **_"Documents\Arduino\libraries\firebase-arduino-master\src"_**.
- Find **_FirebaseHttpClient.c_**.
- Scroll to the bottom and replace the fingerprint we acquired earlier when setting up the database.

- Set up the SSID and password for you internet wifi as:

```ino
#define WIFI_SSID "☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆"
#define WIFI_PASSWORD "☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆"
```

- Set up firebase realtime database as:

```ino

#define FIREBASE_HOST "☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆"
#define FIREBASE_AUTH "☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆"
```

- You will get the above details from the project settings in the firebase console.
- Set up the baud rate to be 115200.
- The code below will connect the device to Wifi and Firebase.

```ino
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
```

- The code below will extract the data in small brackets which will be the PPG sample points.

```ino

    if (data.startsWith("(") && data.endsWith(")")) {
      String graphString = data.substring(1, data.length() - 1);
      int graphVal = graphString.toInt();

      values[numValues++] = graphVal;
      // Combining three sample points into one integer to implement batch upload.
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
    }

```

- The code below will send the SpO2, Heart Rate and Heart Rate ECG values

```ino
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
```

# Website

## **_Setting Up the Website and Installing Dependencies_**

- You can either create your own react project, visit the official documentation for tutorials and guidance.
- You can also download the code in this repository.
- After downloading the code, in the root directory go to the console and install all the dependencies using **_npm install_**
- Make sure you have **_node package manager_** already installed, if not visit official sites to understand how to download it and how it works.
- The project heirarchy is shown below:
  ![Project Heirarchy](https://i.ibb.co/brb2RTs/Code-MKUa-YOr-Fh-O.png)

## **_Linking Firebase and Retrieving Data_**

- Inside the config directory you will find a file called **_firebase-config.js_**.
- All you have to do is make sure, the configuration details we copied from our database earlier is pasted there.

```js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "☆☆☆☆☆☆☆☆☆☆☆☆☆",
  authDomain: "☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆",
  databaseURL: "☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆",
  projectId: "☆☆☆☆☆☆☆☆☆☆☆",
  storageBucket: "☆☆☆☆☆☆☆☆☆☆☆☆☆",
  messagingSenderId: "☆☆☆☆☆☆☆☆☆☆☆☆",
  appId: "☆☆☆☆☆☆☆",
  measurementId: "☆☆☆☆☆☆☆☆☆☆☆",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```

- If you go the the statistics page, the database is simply called and processed as per the documentations of Firebase Realtime Database and React.
- Consider going through the official documentation of ApexCharts which is the library used to display the waveforms. ***https://apexcharts.com/react-chart-demos/line-charts/realtime/***
- After entering **_npm start_** on the console in the root directory, the website will be launched on localhost:3000.
