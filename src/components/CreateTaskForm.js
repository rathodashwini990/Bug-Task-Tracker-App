import { useState, useEffect } from "react";

export default function CreateTaskForm({ onAdd, username, editingTask }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
    assignedTo: username,
    startDate: "", 
    dueDate: "", 
    tags: "",
    estimatedHours: "", 
    type: "Task"
  });

  useEffect(() => {
    if (editingTask) {
        setForm({
            ...editingTask,
            tags: Array.isArray(editingTask.tags)
              ? editingTask.tags.join(", ")
              : "",
          });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      ...form,
      id: editingTask?.id || Date.now(),
      tags: form.tags
        ? form.tags.split(",").map((tag) => tag.trim())
        : [],
    };
    onAdd(taskData);
    setForm({
      title: "", 
      description: "", 
      priority: "Medium", 
      status: "Open",
      assignedTo: username, 
      startDate: "", 
      dueDate: "", 
      tags: "",
      estimatedHours: "", 
      type: "Task"
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="Task">Task</option>
        <option value="Bug">Bug</option>
      </select>
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Open</option>
        <option>In Progress</option>
        <option>Pending Approval</option>
        <option>Closed</option>
        <option>Reopened</option>
      </select>
      <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
      <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" />
      <input name="estimatedHours" value={form.estimatedHours} onChange={handleChange} placeholder="Estimated Hours" />
      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
}