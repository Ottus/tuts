// ============================================================
// App.jsx — ROOT COMPONENT (owns ALL application state)
// ============================================================
// Concept: "Lifting State Up"
//   State lives in the HIGHEST parent that needs it.
//   Here, App owns the task list and passes it DOWN via props.

import { useState, useEffect } from 'react'; // ← Hooks (functions that "hook into" React)
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import './App.css';

export default function App() {
  // ------------------------------------------------------------
  // STATE: the single source of truth for all tasks
  // useState returns [currentValue, setterFunction]
  // We initialize with an empty array.
  // ------------------------------------------------------------
  const [tasks, setTasks] = useState([]);

  // ------------------------------------------------------------
  // PERSISTENCE: save/load tasks to localStorage
  // useEffect runs AFTER the component renders.
  // The dependency array [tasks] means: "re-run when tasks change"
  // The empty [] would mean "run once on mount only"
  // ------------------------------------------------------------
  useEffect(() => {
    // Save to browser storage so tasks survive a page refresh
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]); // ← dependency array

  // Load tasks ONCE when the component first mounts
  useEffect(() => {
    const saved = localStorage.getItem('tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []); // ← empty array = run once on mount

  // ------------------------------------------------------------
  // HANDLERS: functions that MUTATE state (via setters)
  // In React you NEVER mutate state directly.
  // You call the setter with a NEW value.
  // ------------------------------------------------------------

  // ADD a new task
  const addTask = (title) => {
    // Create a new task object with a unique id
    const newTask = {
      id: Date.now(), // simple unique id (timestamp)
      title,
      completed: false,
    };
    // Spread old array + append new item → creates a NEW array
    // (React needs a new reference to detect the change)
    setTasks([...tasks, newTask]);
  };

  // TOGGLE completion status of a task
  const toggleTask = (id) => {
    // .map() returns a NEW array (non-mutating)
    // For the matching task, flip its `completed` flag
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed } // spread + override
          : task                                     // keep unchanged
      )
    );
  };

  // DELETE a task by id
  const deleteTask = (id) => {
    // .filter() returns a NEW array excluding the match
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // DELETE all completed tasks
  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  // ------------------------------------------------------------
  // DERIVED DATA: compute values from state (no extra state needed)
  // ------------------------------------------------------------
  const completedCount = tasks.filter((t) => t.completed).length;

  // ------------------------------------------------------------
  // RENDER: return JSX (HTML-like syntax inside JavaScript)
  // JSX is compiled to React.createElement() calls.
  // Every JSX tree must have ONE root element.
  // ------------------------------------------------------------
  return (
    <div className="app">
      <h1>Task Manager</h1>

      {/* TaskForm receives the addTask function as a PROP (callback) */}
      <TaskForm onAdd={addTask} />

      {/* TaskList receives tasks + handlers as PROPS */}
      <TaskList
        tasks={tasks}
        onToggle={toggleTask}
        onDelete={deleteTask}
        onClearCompleted={clearCompleted}
        completedCount={completedCount}
      />
    </div>
  );
}   