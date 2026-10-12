// ============================================================
// TaskItem.jsx — SINGLE ITEM (props + callbacks)
// ============================================================
// Concept: "Dumb / Presentational Component"
//   This component receives data (props) and emits events
//   (callbacks). It owns NO state of its own.
//   This keeps it reusable and easy to test.

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {/*
        CHECKBOX as a toggle:
        - checked={task.completed}  → controlled by prop
        - onChange fires the PARENT's toggle function
        - We pass task.id so the parent knows WHICH task to toggle
      */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      <span
        className="task-title"
        // Double-click to delete (alternative UX)
        onDoubleClick={() => onDelete(task.id)}
      >
        {task.title}
      </span>

      {/* Delete button — calls parent's delete with this task's id */}
      <button
        className="delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
      >
        ✕
      </button>
    </li>
  );
}   