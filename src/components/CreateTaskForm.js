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
    type: "Task",
    createdBy: username,
    project: "",
    createdDate: new Date().toISOString().split("T")[0],
    updatedDate: new Date().toISOString().split("T")[0],
    timeSpent: 0
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
    const now = new Date().toISOString().split("T")[0];
    const taskData = {
      ...form,
      id: editingTask?.id || Date.now(),
      tags: form.tags ? form.tags.split(",").map((tag) => tag.trim()) : [],
      createdDate: editingTask ? form.createdDate : now,
      updatedDate: now,
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
      type: "Task",
      createdBy: username,
      project: "",
      createdDate: now,
      updatedDate: now,
      timeSpent: 0
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

      <input name="assignedTo" value={form.assignedTo} onChange={handleChange} placeholder="Assigned To" />
      <input name="createdBy" value={form.createdBy} onChange={handleChange} placeholder="Created By" />
      <input name="project" value={form.project} onChange={handleChange} placeholder="Project" />

      <input name="createdDate" type="date" value={form.createdDate} onChange={handleChange} />
      <input name="updatedDate" type="date" value={form.updatedDate} onChange={handleChange} />
      <input name="startDate" type="date" value={form.startDate} onChange={handleChange} />
      <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />

      <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" />
      <input name="estimatedHours" value={form.estimatedHours} onChange={handleChange} placeholder="Estimated Hours" />
      <input name="timeSpent" value={form.timeSpent} onChange={handleChange} placeholder="Time Spent (in seconds)" />

      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
}