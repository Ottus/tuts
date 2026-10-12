// ============================================================
// TaskList.jsx — LIST RENDERING + CONDITIONAL UI
// ============================================================
// Concepts:
//   - .map() to render a list from an array
//   - `key` prop for React's reconciliation (diffing)
//   - Conditional rendering with ternary / &&
//   - Passing callbacks down to children

import TaskItem from './TaskItem.jsx';

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onClearCompleted,
  completedCount,
}) {
  // ----------------------------------------------------------
  // CONDITIONAL RENDERING:
  // If there are no tasks, show a friendly message instead of
  // an empty list. This is the "ternary" pattern in JSX.
  // ----------------------------------------------------------
  if (tasks.length === 0) {
    return (
      <p className="empty-state">
        🎉 No tasks yet. Add one above!
      </p>
    );
  }

  return (
    <div className="task-list-container">
      {/*
        LIST RENDERING:
        .map() transforms each task object into a <TaskItem />
        The `key` prop is CRITICAL — it tells React which item
        is which when the list changes (add/remove/reorder).
        Without a stable key, React may re-mount components
        incorrectly, causing bugs (lost state, wrong animations).
      */}
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}        // ← unique, stable identifier
            task={task}          // ← pass the whole task object
            onToggle={onToggle}  // ← pass the callback down
            onDelete={onDelete}
          />
        ))}
      </ul>

      {/*
        CONDITIONAL with &&:
        Only render the "Clear" button if there's at least
        one completed task. If false → renders nothing (false).
      */}
      {completedCount > 0 && (
        <button className="clear-btn" onClick={onClearCompleted}>
          Clear {completedCount} completed
        </button>
      )}
    </div>
  );
}   