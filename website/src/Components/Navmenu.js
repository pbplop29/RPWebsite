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
              <a href="/">home</a>
            </li>

            <li>
              <a href="/statistics">statistics</a>
            </li>
            <li>
              <a href="/create_patient">patient entry</a>
            </li>
          </ul>
          <ul class="menu-links"></ul>
        </nav>
      </div>
    </div>
  );
}

export default Navmenu;
