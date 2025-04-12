export default function TaskCard({ title, status, date }) {
    return (
      <div className="task-card">
        <h3>{title}</h3>
        <p>Status: <strong>{status}</strong></p>
        <p>Date: {date}</p>
      </div>
    );
  }  