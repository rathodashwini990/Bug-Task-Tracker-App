import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default function TrendChart({ tasks }) {
  const taskCountByDate = tasks.reduce((acc, task) => {
    acc[task.date] = (acc[task.date] || 0) + 1;
    return acc;
  }, {});

  const dates = Object.keys(taskCountByDate).sort();
  const counts = dates.map((date) => taskCountByDate[date]);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Tasks per Day",
        data: counts,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
}