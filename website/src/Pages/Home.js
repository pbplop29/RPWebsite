import React from "react";
import "../Styles/pages.css";
import bgImage from "../Assets/bg.jpg";

function Home() {
  return (
    <div className="container">
      <h1 className="heading">Welcome</h1>
      <div className="paragraph-boxes-container">
        <div className="paragraph-box align-right">
          <p>
            Welcome to our health monitoring system, where we use advanced
            technology to measure your SpO2 and heart rate values and track them
            over time. Our system is designed to provide you with accurate and
            reliable health measurements that can help you stay on top of your
            health.
          </p>
        </div>
        <div className="paragraph-box align-left">
          <p>
            At the heart of our monitoring system is a pulse oximeter, which is
            a non-invasive device that measures the oxygen saturation level in
            your blood and your heart rate. This device is simple to use and can
            provide you with instant measurements of your SpO2 and heart rate
            values.
          </p>
        </div>
        <div className="paragraph-box align-right">
          <p>
            When you use our monitoring system, you'll be able to see your SpO2
            and heart rate values in real-time. These values are displayed on a
            clear and easy-to-read interface that makes it easy to track your
            health over time.
          </p>
        </div>
        <div className="paragraph-box align-left">
          <p>
            In addition to providing you with real-time measurements, our
            monitoring system also allows you to store and track your
            measurements over time. This means that you can see how your SpO2
            and heart rate values change over time, which can help you identify
            any potential health issues early on.
          </p>
        </div>
        <div className="paragraph-box align-right">
          <p>
            Our monitoring system also includes a PPG graph, which shows the
            changes in your blood volume in response to your heartbeats. This
            graph can help you understand how your heart is functioning and
            identify any irregularities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
