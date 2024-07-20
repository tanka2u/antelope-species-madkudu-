import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BarChart() {
  const initialData = {
    labels: [
      "Twisted",
      "Straight",
      "Spiky",
      "Spiraled",
      "Lyre-shaped",
      "Curved",
    ],
    datasets: [],
  };

  const [data, setData] = useState(initialData);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:4000/antelopes")
        .then((response) => response.json())
        .then((res) => {
          const hornCount = res.reduce((acc, animal) => {
            acc[animal.horns] = (acc[animal.horns] || 0) + 1;
            return acc;
          }, {});

          const labels = Object.keys(hornCount);
          const dataValues = Object.values(hornCount);

          setData({
            labels: labels,
            datasets: [
              {
                label: "Antelope Horn Count",
                data: dataValues,
                backgroundColor: [
                  "aqua",
                  "red",
                  "green",
                  "black",
                  "Yellow",
                  "blue",
                ],
                borderColor: "black",
                borderWidth: 1,
              },
            ],
          });
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    };
    fetchData();
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          font: {
            size: 14,
          },
          color: "black",
        },
      },
    },
  };

  return (
    <div
      style={{
        boxSizing: "border-box",
        width: "50%",
        justifyContent: "center",
        marginLeft: "12%",
      }}
    >
      <p>
        Go to <Link to="/">the table of Antelopes</Link>.
      </p>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Data showing horns types of the Antelopes
      </h1>
      <Bar data={data} options={options}></Bar>
    </div>
  );
}
export default BarChart;
