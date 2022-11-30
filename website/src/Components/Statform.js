import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase-config";
import { onValue, ref } from "firebase/database";
import { SiOxygen } from "react-icons/si";
import { AiFillHeart } from "react-icons/ai";
import { VscGraphLine } from "react-icons/vsc";

import "../Styles/components.css";

function Statform() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [spo2, setSpo2] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [heartRateECG, setHeartRateECG] = useState(0);

  // const [passValue, setpassValue] = useState(" ");

  // useEffect(() => {
  //   setpassValue(
  //     JSON.stringify(JSON.parse(sessionStorage.getItem("username")))
  //   );
  // }, []);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      var temp_prj = [];
      //   let keylist = [];
      //   let valuelist = [];
      snapshot.forEach(function (sonSnapshot) {
        var combined = [];
        sonSnapshot.forEach(function (childSnapshot) {
          //   keylist.push(childSnapshot.key);
          //   valuelist.push(childSnapshot.val());
          combined.push({
            key: childSnapshot.key,
            value: childSnapshot.val(),
          });
        });
        temp_prj.push({
          key: sonSnapshot.key,
          value: combined,
        });
      });
      setProjects(temp_prj);
    });
  }, []);
  console.log(projects);
  // console.log(projects[0] ? projects[0].value[0].key : "Sorry No Project Item");

  return (
    <>
      <div>
        {Object.keys(projects).map((item) => {
          return Object.keys(projects[item].value).map((subitem) => {
            console.log(projects[item].value[subitem].key);
            return (
              <div key={subitem}>
                {" "}
                <div>{projects[item].value[subitem].key}</div>
                <div>{projects[item].value[subitem].value}</div>
              </div>
            );
          });

          return (
            <div key={item}>
              <p>
                {item}
                <span>-----</span>
                {projects[item].key}
              </p>
            </div>
          );
        })}
      </div>
      {/* <div>
        {projects.map((first) => {
          first.map((el) => {
            el.map((key, value) => {
              <div>
                <h1>{key}</h1>
                <h1>{value}</h1>
              </div>;
            });
          });
        })}
      </div> */}
      {/* <div>passValue: {passValue}</div> */}
      {/* <div className="card_container_parent">
        {" "}
        <div class="card-container">
          <div class="name_heading">{name}</div>

          <img
            class="round"
            src="https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
      </div> */}
    </>
  );
}

export default Statform;
