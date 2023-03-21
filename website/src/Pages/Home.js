import React from "react";
import "../Styles/pages.css";
import bgImage from "../Assets/bg.jpg";
import stethImage from "../Assets/steth.jpg";
import electroImage from "../Assets/electro.jpg";
function Home() {
  return (
    <div>
      <div class="home-container">
        <div class="home-text">
          <p className="welcome">
            Welcome to our heart rate and PPG monitoring system.
          </p>
          <p>
            At the heart of our system is an Arduino microcontroller that
            interfaces with a variety of sensors to measure your heart rate and
            PPG (photoplethysmography) signal. The sensors are non-invasive and
            easy to use, making it simple for anyone to use our system.
          </p>
        </div>
        <div class="home-image">
          <img src={bgImage} alt="stethescope image"></img>
        </div>
      </div>
      <div class="home-container">
        <div class="home-text">
          <p>
            We understand the importance of accuracy when it comes to heart rate
            and PPG monitoring, which is why we've designed our system to be
            highly accurate and reliable. Our system uses advanced algorithms to
            filter out noise and ensure that you get accurate readings every
            time.
          </p>
        </div>
        <div class="home-image">
          <img src={stethImage} alt="stethescope image"></img>
        </div>
      </div>
      <div class="home-container">
        <div class="home-text">
          <p>
            At the heart of our system is an Arduino microcontroller that
            interfaces with a variety of sensors to measure your heart rate and
            PPG (photoplethysmography) signal. The sensors are non-invasive and
            easy to use, making it simple for anyone to use our system.
          </p>
          <p>
            Our system is highly customizable, allowing you to choose the
            sensors and configuration that best fit your needs. Whether you need
            a basic heart rate monitor or a more advanced system that can track
            multiple parameters, our system has you covered.
          </p>
        </div>
        <div class="home-image">
          <img src={electroImage} alt="stethescope image"></img>
        </div>
      </div>
    </div>
  );
}

export default Home;
