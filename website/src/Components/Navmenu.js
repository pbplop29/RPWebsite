import React from "react";

import "../Styles/components.css";

function Navmenu() {
  return (
    <div class="menu-container">
      <input type="checkbox" id="openmenu" class="hamburger-checkbox"></input>

      <div class="hamburger-icon">
        <label for="openmenu" id="hamburger-label">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div class="menu-pane">
        <nav>
          <ul class="menu-links">
            <li>
              <a href="/">HOME</a>
              <span id="QC-info"></span>
            </li>

            <li>
              <a href="/about">about</a>
            </li>
            <li>
              <a href="/contact">contact</a>
            </li>
          </ul>
          <ul class="menu-links">
            <li>
              <a href="/profile">PROFILE</a>
              <span id="DC-info"></span>
            </li>
            <li>
              <a href="/statistics">statistics</a>
            </li>
            <li>
              <a href="">logout</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Navmenu;
