import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase-config";
import { onValue, ref } from "firebase/database";
import { SiOxygen } from "react-icons/si";
import { AiFillHeart } from "react-icons/ai";
import { VscGraphLine } from "react-icons/vsc";

import "../Styles/components.css";

function Statform() {
  //   const [projects, setProjects]     = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [spo2, setSpo2] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [heartRateECG, setHeartRateECG] = useState(0);

  let [passValue, setpassValue] = useState("");

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("username"));
    setpassValue(token);
  }, 10);

  useEffect(() => {
    onValue(ref(db, "NITxxx20"), (snapshot) => {
      //   setProjects([]);
      let keylist = [];
      let valuelist = [];
      var combined = [];
      snapshot.forEach(function (childSnapshot) {
        keylist.push(childSnapshot.key);
        valuelist.push(childSnapshot.val());
        combined.push({
          key: childSnapshot.key,
          value: childSnapshot.val(),
        });
      });
      //   setProjects(combined);
      setAge(combined[0].value);
      setGender(combined[1].value);
      setHeartRate(combined[2].value);
      setHeartRateECG(combined[3].value);
      setName(combined[4].value);
      setSpo2(combined[5].value);
    });
  }, []);

  return (
    <>
      <div>passValue: {passValue}</div>
      <div className="card_container_parent">
        {" "}
        <div class="card-container">
          <div class="name_heading">{name}</div>

          <img
            class="round"
            src="https://scontent.fccu7-1.fna.fbcdn.net/v/t1.6435-1/44219169_1806385802791564_2699434727047168000_n.jpg?stp=c23.0.320.320a_dst-jpg_p320x320&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=U3YTBYcwd6MAX8M_cHa&_nc_ht=scontent.fccu7-1.fna&oh=00_AfDs6_7DpNX1SjY9r4T2XLwXDfsnGn1h1OdR-FToyzj2ag&oe=63982947"
            alt="user"
          />
          <div>{gender}</div>
          <div>{age}</div>
          <div class="stats">
            <div>
              <div class="icon_stat">
                <SiOxygen />
              </div>{" "}
              {spo2}
            </div>
            <div>
              <div class="icon_stat">
                <AiFillHeart />
              </div>{" "}
              {heartRate}
            </div>
            <div>
              <div class="icon_stat">
                <VscGraphLine />
              </div>{" "}
              {heartRateECG}
            </div>
          </div>

          <div class="skills">
            <ul>
              <li>Blood Pressure</li>
              <li>Diabetes</li>
              <li>Breathing Problems</li>
              <li>Concussions</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Statform;
