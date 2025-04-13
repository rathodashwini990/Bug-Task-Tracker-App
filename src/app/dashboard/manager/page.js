"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../../components/Header";
import TaskCard from "../../../components/TaskCard";
import TaskFilter from "../../../components/TaskFilter";
import tasksData from "../../../data/tasks.json";
import { formatTime } from "../../utils/timeUtils";
import "../../styles/dashboard.css";

export default function ManagerDashboard() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ priority: "", status: "" });
  const router = useRouter();

  useEffect(() => {
    setTasks(tasksData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    router.push("/");
  };

  const filteredTasks = tasks.filter((task) => {
    const priorityMatch = filters.priority
      ? task.priority === filters.priority
      : true;
    const statusMatch = filters.status ? task.status === filters.status : true;
    return priorityMatch && statusMatch;
  });

  const totalTime = tasks.reduce(
    (sum, task) => sum + (task.timeSpent || 0),
    0
  );

  return (
    <div className="dashboard">
      <Header role="Manager" />
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>

      <TaskFilter filters={filters} setFilters={setFilters} />
      <h2>All Tasks</h2>
      <p>Total Time Spent: {formatTime(totalTime)}</p>
      <div className="task-grid">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} role="Manager" />
        ))}
      </div>
    </div>
  );
}