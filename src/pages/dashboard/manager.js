import Header from "../../components/Header";
import TaskCard from "../../components/TaskCard";
import "../../styles/dashboard.css";

export default function ManagerDashboard() {
  return (
    <div className="dashboard">
      <Header role="Manager" />
      <h2>Team Tasks</h2>
      <div className="task-grid">
        <TaskCard title="Review bug list" status="Completed" />
        <TaskCard title="Assign new tasks" status="Pending" />
      </div>
    </div>
  );
}