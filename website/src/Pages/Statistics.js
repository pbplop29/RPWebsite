import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase-config";
import { onValue, ref } from "firebase/database";
import { SiOxygen } from "react-icons/si";
import { AiFillHeart } from "react-icons/ai";
import { VscGraphLine } from "react-icons/vsc";

import "../Styles/components.css";

function Statistics() {
  const [projects, setProjects] = useState([]);
  // const [name, setName] = useState("");
  // const [age, setAge] = useState("");
  // const [gender, setGender] = useState("");
  // const [spo2, setSpo2] = useState(0);
  // const [heartRate, setHeartRate] = useState(0);
  // const [heartRateECG, setHeartRateECG] = useState(0);

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
  // console.log(projects);
  // console.log(projects[0] ? projects[0].value[0].key : "Sorry No Project Item");

  return (
    <>
      <div className="card_container_grand">
        {Object.keys(projects).map((item) => {
          let age = projects[item].value[0].value;
          let gender = projects[item].value[1].value;
          let heart_rate = projects[item].value[2].value;
          let heart_rate_ecg = projects[item].value[3].value;
          let name = projects[item].value[4].value;
          let spo2 = projects[item].value[5].value;
          let zlink = projects[item].value[6].value;
          return (
            <div key={item} className="card_container_parent">
              <div class="card-container">
                <div class="name_heading">{name}</div>

                <img class="round" src={zlink} alt="user" />
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
                    {heart_rate}
                  </div>
                  <div>
                    <div class="icon_stat">
                      <VscGraphLine />
                    </div>{" "}
                    {heart_rate_ecg}
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

              {/* {Object.keys(projects[item].value).map((subitem) => {
                console.log(projects[item].value[4].value);

                return (
                  <>
                    <div key={subitem} className="stats">
                      <div>{projects[item].value[subitem].key}</div>
                      <div>{projects[item].value[subitem].value}</div>
                    </div>
                  </>
                );
              })} */}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Statistics;
