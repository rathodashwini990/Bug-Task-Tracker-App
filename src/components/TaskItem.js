import { useState, useEffect } from "react";
import { formatTime } from "../pages/utils/timeUtils";

export default function TaskItem({ task, onEdit, onDelete, onUpdate }) {
  const [timerRunning, setTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(task.timeSpent || 0);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    if (!timerRunning) {
      onUpdate({ ...task, timeSpent: seconds });
    }
  }, [timerRunning]);

  const toggleTimer = () => setTimerRunning(!timerRunning);

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
      <p>Time Spent: {formatTime(seconds)}</p>
      <button onClick={toggleTimer}>{timerRunning ? "Pause" : "Start"} Timer</button>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
}