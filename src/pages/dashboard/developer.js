import { useState, useEffect } from "react";
import Header from "../../components/Header";
import TaskCard from "../../components/TaskCard";
import CreateTaskForm from "../../components/CreateTaskForm";
import tasksData from "../../data/tasks.json";
import "../../styles/dashboard.css";

export default function DeveloperDashboard() {
    const [tasks, setTasks] = useState([]);
    const username = typeof window !== "undefined" ? localStorage.getItem("username") : "";
  
    useEffect(() => {
      const userTasks = tasksData.filter((task) => task.assignedTo === username);
      setTasks(userTasks);
    }, [username]);
  
    const handleAddTask = (newTask) => {
      setTasks((prev) => [...prev, newTask]);
    };
    
    return (
        <div className="dashboard">
            <Header role="Developer" />
            <h2>Create New Task</h2>
            <CreateTaskForm onAdd={handleAddTask} username={username} />

            <h2>Your Tasks</h2>
            <div className="task-grid">
            {tasks.map((task) => (
                <TaskCard key={task.id} {...task} />
            ))}
            </div>
        </div>
    );
}