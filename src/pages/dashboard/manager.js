import { useState, useEffect } from "react";
import Header from "../../components/Header";
import TaskCard from "../../components/TaskCard";
import TaskFilter from "../../components/TaskFilter";
import tasksData from "../../data/tasks.json";
import "../../styles/dashboard.css";

export default function ManagerDashboard() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ priority: "", status: "" });

  useEffect(() => {
    setTasks(tasksData); // All tasks
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const priorityMatch = filters.priority ? task.priority === filters.priority : true;
    const statusMatch = filters.status ? task.status === filters.status : true;
    return priorityMatch && statusMatch;
  });

  return (
    <div className="dashboard">
      <Header role="Manager" />
      <h2>All Tasks</h2>
      <TaskFilter filters={filters} setFilters={setFilters} />
      <div className="task-grid">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} role="Manager" onAction={handleStatusChange} />
        ))}
      </div>
    </div>
  );
}