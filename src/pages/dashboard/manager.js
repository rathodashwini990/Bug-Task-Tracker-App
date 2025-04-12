import Header from "../../components/Header";
import TaskCard from "../../components/TaskCard";
import TrendChart from "../../components/TrendChart";
import tasks from "../../data/tasks.json";
import "../../styles/dashboard.css";

export default function ManagerDashboard() {
  const openTasks = tasks.filter((task) => task.status === "Open");
  const closedTasks = tasks.filter((task) => task.status === "Closed");

  return (
    <div className="dashboard">
      <Header role="Manager" />
      <h2>Open Tasks</h2>
      <div className="task-grid">
        {openTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>

      <h2>Closed Tasks</h2>
      <div className="task-grid">
        {closedTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>

      <h2>Trend Line (Tasks per Day)</h2>
      <TrendChart tasks={tasks} />
    </div>
  );
}