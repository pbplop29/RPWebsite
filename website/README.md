# Overview

This project is a system that uses an SpO2 sensor connected to an Arduino Mega to obtain the PPG waveform. The waveform is then processed to determine the SpO2 value and heart rate, which are sent to an ESP-32. The ESP-32 is programmed to be linked to a Firebase database and updates the collections with the obtained data. A website is also included in the project, which is built using React and is connected to the Firebase database. The website extracts and displays the information obtained from the sensor. SpO2, Heart Rate from SpO2, Heart Rate from ECG and PPG waveform samples are updated in the database and are displayed in the website where the PPG waveform can be observed in realtime with a sampling rate of 10 samples per second.

# Contents

    1. Database
        a) Creation
        b) Setting up and settings
        c) Tokens and Fingerprints
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

## Realtime Database

### Creating the database

- Create firebase account.
- Go to firebase console.
- Create a new project (Give project name, and server locations).
- Click on build and select Realtime Database.
- Add website or webapp in the menu.
- Create the database and go to the rules and setup the rules to give access to read and write.
- You can now create a collection with fields you want which will serve as your database.
  ![Looks like](https://ibb.co/YBbKD1B)

### Information to be extracted

- Go to project settings.
- Go to General.
- Scroll down to the website or webapp panel.
- Copy the firebase configuration details that looks like:

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

- This will be needed when we will connect the database to React Website.
