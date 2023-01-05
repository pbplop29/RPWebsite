import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase-config";
import { onValue, ref } from "firebase/database";
import { SiOxygen } from "react-icons/si";
import { AiFillHeart } from "react-icons/ai";
import { VscGraphLine } from "react-icons/vsc";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import ApexCharts from "react-apexcharts";

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
      snapshot.forEach(function (sonSnapshot) {
        var combined = [];
        sonSnapshot.forEach(function (childSnapshot) {
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
          let zzgraph = projects[item].value[7];

          let graphlist = [];
          let graphlist2 = [];
          let graphlist3 = [];
          let index = 0;
          {
            Object.keys(zzgraph.value).map((id) => {
              let current_graph_value = zzgraph.value[id];
              graphlist.push({
                x: index,
                y: parseFloat(current_graph_value),
              });
              graphlist2.push(parseFloat(current_graph_value));
              graphlist3.push(index);
              index = index + 1;
            });
          }
          // console.log(graphlist);
          // console.log(graphlist2);
          // console.log(graphlist3);

          const series = [
            {
              name: "PPG",
              data: graphlist2,
            },
          ];

          const options = {
            chart: {
              id: "realtime",
              height: 350,
              width: 300,
              type: "line",
              animations: {
                enabled: true,
                easing: "linear",
                dynamicAnimation: {
                  speed: 1000,
                },
              },
              toolbar: {
                show: true,
              },
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            grid: {
              row: {
                colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.1,
              },
            },
            stroke: {
              curve: "smooth",
              width: 1.5,
            },
            title: {
              text: "PPG Graph",
              align: "center",
            },
            markers: {
              size: 0,
            },
            xaxis: {
              type: " numeric ",
              range: 20,
              min: 0,
              max: 20,
              show: true,
              labels: {
                show: false,
              },
              axisBorder: {
                show: true,
              },
              axisTicks: {
                show: true,
              },
            },
            yaxis: {
              show: true,
              labels: {
                show: true,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            legend: {
              show: true,
            },
          };

          return (
            <div key={item} className="card_container_parent">
              <div id="chart">
                <ApexCharts
                  options={options}
                  series={series}
                  type="line"
                  height={350}
                />
              </div>

              <LineChart width={500} height={300} data={graphlist}>
                <XAxis dataKey="x" />
                <YAxis />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="y" stroke="#8884d8" />
              </LineChart>
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
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Statistics;
