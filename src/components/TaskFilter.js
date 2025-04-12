export default function TaskFilter({ filters, setFilters }) {
    return (
      <div className="task-filter">
        <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
          <option value="">All Priorities</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
  
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Statuses</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Pending Approval</option>
          <option>Closed</option>
          <option>Reopened</option>
        </select>
      </div>
    );
  }  