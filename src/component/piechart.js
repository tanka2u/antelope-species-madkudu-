import { Doughnut } from "react-chartjs-2";
import {Link} from "react-router-dom"
import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const initialData = {
  datasets: [
    {
      data: [],
      backgroundColor: ["red", "yellow"],
    },
  ],
  labels: [],
};

export default function PieChart() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:4000/antelopes")
        .then((response) => response.json())
        .then((res) => {
          console.log("data", res);

          const continentCount = res.reduce((acc, animal) => {
            acc[animal.continent] = (acc[animal.continent] || 0) + 1;
            return acc;
          }, {});

          const labels = Object.keys(continentCount);
          const data = Object.values(continentCount);

          setData({
            datasets: [
              {
                data: data,
                backgroundColor: ["red", "yellow"],
              },
            ],
            labels: labels,
          });
        })
        .catch((e) => {
          console.log("error", e);
        });
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        boxSizing: "border-box",
        width: "30%",
        justifyContent: "center",
        marginLeft: "20%",
      }}
    >
      <p>
        Go to <Link to="/">the table of Antelopes</Link>.
      </p>
      <h1 style={{ display: "flex", justifyContent: "center" }}>Habitant of Antelopes</h1>
      <Doughnut data={data} />
      <p>
        From the above chart we found that most of the Antelopes are found in <b>ASIA</b> rather than <b>AFRICA</b>
      </p>
    </div>
  );
}
