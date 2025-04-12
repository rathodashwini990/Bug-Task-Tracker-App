import { useState } from "react";

export default function CreateTaskForm({ onAdd, username }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
    assignedTo: username,
    date: new Date().toISOString().split("T")[0],
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      ...form,
      id: Date.now(),
    };
    onAdd(newTask);
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      status: "Open",
      assignedTo: username,
      date: new Date().toISOString().split("T")[0],
      dueDate: "",
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Open</option>
        <option>In Progress</option>
        <option>Closed</option>
      </select>
      <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} placeholder="Due Date" />
      <button type="submit">Add Task</button>
    </form>
  );
}
