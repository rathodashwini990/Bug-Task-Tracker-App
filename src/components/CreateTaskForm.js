'use client';
import { useState, useEffect } from "react";
import "../app/styles/createform.css";

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
      <label>Title</label>
      <input name="title" value={form.title} onChange={handleChange} required />

      <label>Description</label>
      <textarea name="description" value={form.description} onChange={handleChange} />

      <label>Type</label>
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="Task">Task</option>
        <option value="Bug">Bug</option>
      </select>

      <label>Priority</label>
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <label>Status</label>
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Open</option>
        <option>In Progress</option>
        <option>Pending Approval</option>
        <option>Closed</option>
        <option>Reopened</option>
      </select>

      <label>Assigned To</label>
      <input name="assignedTo" value={form.assignedTo} onChange={handleChange} />

      <label>Created By</label>
      <input name="createdBy" value={form.createdBy} onChange={handleChange} />

      <label>Project</label>
      <input name="project" value={form.project} onChange={handleChange} />

      <label>Created Date</label>
      <input name="createdDate" type="date" value={form.createdDate} onChange={handleChange} />

      <label>Updated Date</label>
      <input name="updatedDate" type="date" value={form.updatedDate} onChange={handleChange} />

      <label>Start Date</label>
      <input name="startDate" type="date" value={form.startDate} onChange={handleChange} />

      <label>Due Date</label>
      <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />

      <label>Tags (comma separated)</label>
      <input name="tags" value={form.tags} onChange={handleChange} />

      <label>Estimated Hours</label>
      <input name="estimatedHours" value={form.estimatedHours} onChange={handleChange} />

      <label>Time Spent (in seconds)</label>
      <input name="timeSpent" value={form.timeSpent} onChange={handleChange} />

      <button type="submit">{editingTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
}