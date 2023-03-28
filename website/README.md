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
            - Getting data from sensor
            - Processing data
            - Sending data to ESP-32
        c) ESP-32
            - Getting data from Arduino Mega
            - Processing data
            - Linking firebase
            - Sending data to Firebase
    3. Website
        a) Setting up Website
        b) Installing dependencies
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
