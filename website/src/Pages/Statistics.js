import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase-config";

import "../Styles/pages.css";

function Statistics() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const infoRef = db.database().ref("SpO2");
    infoRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const infoList = [];
      for (let id in data) {
        infoList.push({ id, ...data[id] });
      }
      setInfo(infoList);
    });
  }, []);

  return (
    <div>
      {info.map((info) => {
        <>{info.message}</>;
      })}
    </div>
  );
}

export default Statistics;
