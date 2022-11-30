import React, { useState, useEffect } from "react";
import Statform from "../Components/Statform";
import "../Styles/pages.css";

function Statistics() {
  const [username, setUsername] = useState("");

  // useEffect(() => {
  //   localStorage.setItem("username", JSON.stringify(username));
  // }, []);

  // const onHandleSubmit = () => {
  //   sessionStorage.setItem("username", JSON.stringify(username));
  // };

  return (
    <>
      <div className="form-container">
        <Statform />
      </div>
    </>
  );
}

export default Statistics;
