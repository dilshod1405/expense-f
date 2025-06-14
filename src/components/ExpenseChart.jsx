import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import WarningBanner from "./WarningBanner";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const ExpenseChart = () => {
  const [chartData, setChartData] = useState(null);
  const [labels, setLabels] = useState([]);
  const [growthFlags, setGrowthFlags] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5002/api/monthly-expenses").then((res) => {
      const { labels, values } = res.data;

      const growths = values.map((val, idx) => {
        if (idx === 0) return null;
        return val > values[idx - 1] ? "up" : val < values[idx - 1] ? "down" : null;
      });

      setLabels(labels);
      setGrowthFlags(growths);

      setChartData({
        labels,
        datasets: [
          {
            label: "Monthly Expenses ($)",
            data: values,
            fill: false,
            borderColor: "#ffffff",
            backgroundColor: "#ffffff",

            tension: 0.3,
            pointBackgroundColor: growths.map((g) =>
              g === "up" ? "#ff4d4f" : g === "down" ? "#00e676" : "#ffffff"
            ),
            pointRadius: 6,
          },
        ],
      });
    });
  }, []);

  if (!chartData) return <p className="text-center">Loading...</p>;

  const hasGrowth = growthFlags.includes("up");

  return (
    <div className="bg-gray-800 p-4 rounded-2xl shadow-xl">
      {hasGrowth && <WarningBanner />}
      <Line data={chartData} options={{
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: "white"
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: "#ccc"
            }
          },
          y: {
            ticks: {
              color: "#ccc"
            }
          }
        }
      }} />
    </div>
  );
};

export default ExpenseChart;