import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import TaskCard from "../../components/TaskCard";
import CreateTaskForm from "../../components/CreateTaskForm";
import TaskFilter from "../../components/TaskFilter";
import tasksData from "../../data/tasks.json"; // ✅ ensure correct path
import { formatTime } from "../utils/timeUtils";
import "../../styles/dashboard.css";

export default function DeveloperDashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ priority: "", status: "" });
  const username = typeof window !== "undefined" ? localStorage.getItem("username") : "";
  const router = useRouter();

  useEffect(() => {
    const userTasks = tasksData.filter((task) => task.assignedTo === username);
    setTasks(userTasks);
  }, [username]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    router.push("/");
  };

  const handleAddTask = (newTask) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...newTask, id: editingTask.id } : t))
      );
      setEditingTask(null);
    } else {
      setTasks((prev) => [...prev, newTask]);
    }
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleRequestClosure = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
    );
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const priorityMatch = filters.priority ? task.priority === filters.priority : true;
    const statusMatch = filters.status ? task.status === filters.status : true;
    return priorityMatch && statusMatch;
  });

  const totalTime = tasks.reduce((sum, task) => sum + (task.timeSpent || 0), 0);

  return (
    <div className="dashboard">
      <Header role="Developer" />
      <button onClick={handleLogout} className="logout-button">Logout</button>

      <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>
      <CreateTaskForm onAdd={handleAddTask} username={username} editingTask={editingTask} />

      <TaskFilter filters={filters} setFilters={setFilters} />
      <h2>Your Tasks</h2>
      <p>Total Time Spent: {formatTime(totalTime)}</p>
      <div className="task-grid">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            role="Developer"
            onDelete={handleDelete}
            onEdit={setEditingTask}
            onAction={handleRequestClosure}
            onUpdate={handleUpdateTask}
          />
        ))}
      </div>
    </div>
  );
}