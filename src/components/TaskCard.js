export default function TaskCard({ task, role, onDelete, onEdit, onAction, onUpdate }) {
  const {
    id, title, description, priority, status, assignedTo,
    startDate, dueDate, tags, estimatedHours, type,
    createdBy, project, createdDate, updatedDate, timeSpent
  } = task;

  const isDeveloper = role === "Developer";
  const isManager = role === "Manager";

  return (
    <div className="task-card">
      <h3>{title} <span className="tag">{type}</span></h3>
      <p><strong>Description:</strong> {description || "N/A"}</p>
      <p><strong>Priority:</strong> {priority || "N/A"}</p>
      <p><strong>Status:</strong> {status || "N/A"}</p>
      <p><strong>Assigned To:</strong> {assignedTo || "N/A"}</p>
      <p><strong>Created By:</strong> {createdBy || "N/A"}</p>
      <p><strong>Project:</strong> {project || "N/A"}</p>
      <p><strong>Created Date:</strong> {createdDate || "N/A"}</p>
      <p><strong>Start:</strong> {startDate || "N/A"}</p>
      <p><strong>Due:</strong> {dueDate || "N/A"}</p>
      <p><strong>Updated Date:</strong> {updatedDate || "N/A"}</p>
      <p><strong>Estimated:</strong> {estimatedHours ? `${estimatedHours} hrs` : "N/A"}</p>
      <p><strong>Time Spent:</strong> {Math.floor((timeSpent || 0) / 3600)}h {(Math.floor((timeSpent || 0) % 3600 / 60))}m</p>
      <p><strong>Tags:</strong> {tags?.length > 0 ? tags.join(", ") : "N/A"}</p>

      {isDeveloper && (
        <div className="task-actions">
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(id)}>Delete</button>
          {status !== "Pending Approval" && status !== "Closed" && type === "Bug" && (
            <button onClick={() => onAction(id, "Pending Approval")}>Request Closure</button>
          )}
        </div>
      )}

      {isManager && status === "Pending Approval" && (
        <div className="task-actions">
          <button onClick={() => onAction(id, "Closed")}>Approve</button>
          <button onClick={() => onAction(id, "Reopened")}>Reopen</button>
        </div>
      )}
    </div>
  );
}