import Header from "../../components/Header";
import TaskCard from "../../components/TaskCard";
import tasks from "../../data/tasks.json";
import "../../styles/dashboard.css";

export default function DeveloperDashboard() {
  const user = typeof window !== "undefined" ? localStorage.getItem("role") : "";
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : "";

  const userTasks = tasks.filter((task) => task.assignedTo === username);

  return (
    <div className="dashboard">
      <Header role="Developer" />
      <h2>Your Tasks</h2>
      <div className="task-grid">
        {userTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}