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
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Priority:</strong> {priority}</p>
      <p><strong>Status:</strong> {status}</p>
      <p><strong>Assigned To:</strong> {assignedTo}</p>
      <p><strong>Created By:</strong> {createdBy}</p>
      <p><strong>Project:</strong> {project}</p>
      <p><strong>Created Date:</strong> {createdDate}</p>
      <p><strong>Start:</strong> {startDate}</p>
      <p><strong>Due:</strong> {dueDate}</p>
      <p><strong>Updated Date:</strong> {updatedDate}</p>
      <p><strong>Estimated:</strong> {estimatedHours} hrs</p>
      <p><strong>Time Spent:</strong> {Math.floor((timeSpent || 0) / 3600)}h {(Math.floor((timeSpent || 0) % 3600 / 60))}m</p>
      <p><strong>Tags:</strong> {tags?.join(", ")}</p>

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