import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase-config";
import { onValue, ref } from "firebase/database";

import "../Styles/pages.css";

function Statistics() {
  const [projects, setProjects] = useState([]);

  // useEffect(() => {
  //   onValue(ref(db), (snapshot) => {
  //     setProjects([]);
  //     const data = snapshot.val();
  //     if (data !== null) {
  //       Object.values(data).map((project) => {
  //         setProjects((projects) => [...projects, project]);
  //       });
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   onValue(ref(db), (snapshot) => {
  //     setProjects([]);
  //     let keylist = [];
  //     let valuelist = [];
  //     snapshot.forEach(function (childSnapshot) {
  //       keylist.push(childSnapshot.key);
  //       valuelist.push(childSnapshot.val());
  //     });
  //     setProjects(keylist);
  //   });
  // }, []);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setProjects([]);
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
      setProjects(combined);
    });
  }, []);

  return (
    <>
      <div>
        {projects.map((el) => (
          <>
            <h2>{el.key}</h2>
            <h2>{el.value}</h2>
          </>
        ))}
      </div>
    </>
  );
}

export default Statistics;
