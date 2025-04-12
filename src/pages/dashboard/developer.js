import Header from "../../components/Header";
import TaskCard from "../../components/TaskCard";
import "../../styles/dashboard.css";

export default function DeveloperDashboard() {
  return (
    <div className="dashboard">
      <Header role="Developer" />
      <h2>Your Tasks</h2>
      <div className="task-grid">
        <TaskCard title="Fix login bug" status="Pending" />
        <TaskCard title="Add trendline chart" status="In Progress" />
      </div>
    </div>
  );
}