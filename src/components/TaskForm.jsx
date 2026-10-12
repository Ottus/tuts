// ============================================================
// TaskForm.jsx — CONTROLLED INPUT + EVENT HANDLING
// ============================================================
// Concept: "Controlled Component"
//   The input's value is driven by React state, not the DOM.
//   Every keystroke updates state → re-render → new value shown.

import { useState } from 'react';

export default function  TaskForm({ onAdd }) {
  // Local state for the input field (only this component cares)
  const [title, setTitle] = useState('');

  // Handler for the "Add" button click
  const handleSubmit = (e) => {
    // e.preventDefault() stops the browser's default form
    // submission (page reload)
    e.preventDefault();

    // Guard: don't add empty/whitespace-only tasks
    if (!title.trim()) return;

    // Call the PARENT's function (passed as a prop)
    // This is how child → parent communication works in React
    onAdd(title.trim());

    // Reset the input after adding
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/*
        CONTROLLED INPUT:
        - value={title}     → input always shows the state value
        - onChange          → fires on every keystroke
        - e.target.value    → the new text the user typed
      */}
      <input
        type="text"
        placeholder="What do you want to accomplish?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}   