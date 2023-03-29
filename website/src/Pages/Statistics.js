import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase-config";
import { onValue, ref } from "firebase/database";
import { SiOxygen } from "react-icons/si";
import { AiFillHeart } from "react-icons/ai";
import { VscGraphLine } from "react-icons/vsc";
import ApexCharts from "react-apexcharts";
import "../Styles/components.css";

function Statistics() {
  const [projects, setProjects] = useState([]);

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
          let zzzgraph = projects[item].value[7];
          let PPG_combined_list = [];
          let PPG_values_list = [];
          let PPG_index_list = [];
          let index = 0;

          Object.keys(zzzgraph.value).map((id) => {
            let current_graph_value = parseInt(zzzgraph.value[id]);
            PPG_combined_list.push({
              x: index,
              y: parseFloat(current_graph_value),
            });
            let a = Math.floor(current_graph_value / 1000000);
            let b = current_graph_value % 1000000;
            let c = b / 1000;
            let d = b % 1000;
            PPG_values_list.push(parseInt(a));
            PPG_values_list.push(parseInt(c));
            PPG_values_list.push(parseInt(d));
            PPG_index_list.push(index);
            index = index + 1;
          });

          const series = [
            {
              name: "PPG",
              data: PPG_values_list,
            },
            // {
            //   name: "EKG",
            //   data: EKG_values_list,
            // },
          ];

          const options = {
            chart: {
              id: "realtime",
              type: "line",
              background: "#DFEEEA",
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
                enabled: true,
              },
            },
            dataLabels: {
              enabled: false,
            },
            grid: {
              row: {
                colors: ["#2F5D62"],
                opacity: 0.1,
              },
              column: {
                colors: ["#2F5D62", "transparent"],
                opacity: 0.1,
              },
            },
            stroke: {
              colors: ["#222266", "#821D3F"],
              curve: "smooth",
              width: 1.5,
            },
            title: {
              text: "PPG and ECG",
              align: "center",

              style: {
                color: "#2F5D62",
              },
            },
            markers: {
              size: 0,
            },
            xaxis: {
              type: " numeric ",
              range: 125,
              min: 0,

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
              type: " numeric ",
              show: true,
              min: 650,
              max: 750,
              // title: {
              //   text: "PPG",
              //   style: {
              //     color: "#ABEB83",
              //   },
              // },
              labels: {
                show: true,
                style: {
                  colors: ["#2F5D62"],
                },
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
              labels: {
                colors: "#2F5D62",
              },
            },
          };

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
              <div class="graph-container">
                <ApexCharts
                  options={options}
                  series={series}
                  type="line"
                  height={460}
                  width={800}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Statistics;
