import React, { useState, useEffect } from "react";
import Statform from "../Components/Statform";
import "../Styles/pages.css";

function Statistics() {
  const [username, setUsername] = useState("");

  // useEffect(() => {
  //   localStorage.setItem("username", JSON.stringify(username));
  // }, []);

  const onHandleSubmit = () => {
    localStorage.setItem("username", JSON.stringify(username));
  };

  return (
    <>
      <div>username: {username}</div>

      <div className="form-container">
        <form onSubmit={onHandleSubmit}>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>

          <div>
            <button>Submit Contact</button>
          </div>
        </form>
        <Statform />
      </div>
    </>
  );
}

export default Statistics;
