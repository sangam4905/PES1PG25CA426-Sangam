"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import styles from "./todo.module.css";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = "pes-todo-list";

function isTask(value: unknown): value is Task {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value && typeof value.id === "string" &&
    "text" in value && typeof value.text === "string" &&
    "completed" in value && typeof value.completed === "boolean"
  );
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [storageStatus, setStorageStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => {
    try {
      const savedTasks = window.localStorage.getItem(STORAGE_KEY);

      if (savedTasks !== null) {
        const parsed: unknown = JSON.parse(savedTasks);
        if (!Array.isArray(parsed) || !parsed.every(isTask)) {
          throw new Error("Invalid saved tasks");
        }
        setTasks(parsed);
      }

      setStorageStatus("ready");
    } catch {
      setStorageStatus("unavailable");
    }
  }, []);

  useEffect(() => {
    // Wait for the read to finish so the initial empty array cannot replace saved tasks.
    if (storageStatus !== "ready") return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      setSaveFailed(false);
    } catch {
      setSaveFailed(true);
    }
  }, [tasks, storageStatus]);

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const taskInput = event.currentTarget.querySelector("input");
    const text = input.trim();

    if (!text) {
      setInputError("Enter a task before adding it.");
      taskInput?.focus();
      return;
    }

    // The fallback also works when opening the app over HTTP on a local network.
    const id = crypto.randomUUID?.() ?? Array.from(crypto.getRandomValues(new Uint32Array(4))).join("-");
    const newTask: Task = { id, text, completed: false };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setInput("");
    setInputError("");
    taskInput?.focus();
  }

  function toggleTask(id: string) {
    setTasks((currentTasks) => currentTasks.map((task) => (
      task.id === id ? { ...task, completed: !task.completed } : task
    )));
  }

  function deleteTask(id: string) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  const completedCount = tasks.filter((task) => task.completed).length;
  const isLoading = storageStatus === "loading";

  return (
    <section className={styles.card} aria-labelledby="task-heading">
      <div className={styles.cardHeader}>
        <h1 id="task-heading">My Tasks</h1>
        <p>Your tasks are saved in this browser.</p>
      </div>

      <div className={styles.progressPanel}>
        <div className={styles.progressHeader}>
          <label htmlFor="task-progress">Progress</label>
          <span aria-live="polite"><strong>{completedCount}</strong> of {tasks.length} complete</span>
        </div>
        <progress
          id="task-progress"
          className={styles.progressBar}
          value={completedCount}
          max={Math.max(tasks.length, 1)}
        />
      </div>

      <form className={styles.taskForm} onSubmit={addTask} noValidate>
        <label htmlFor="new-task">New task</label>
        <div className={styles.formControls}>
          <input
            id="new-task"
            type="text"
            placeholder="Enter a task"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              if (event.target.value.trim()) setInputError("");
            }}
            aria-invalid={Boolean(inputError)}
            aria-describedby={inputError ? "task-error" : undefined}
            autoComplete="off"
            disabled={isLoading}
            required
          />
          <button className={styles.addButton} type="submit" disabled={isLoading}>
            <span className={styles.plusIcon} aria-hidden="true" />
            Add
          </button>
        </div>
        {inputError && <p id="task-error" className={styles.inputError} role="alert">{inputError}</p>}
      </form>

      {(storageStatus === "unavailable" || saveFailed) && (
        <p className={styles.storageError} role="status">
          Browser storage is unavailable. Recent changes may be lost on refresh.
        </p>
      )}

      {isLoading && <p className={styles.loading} role="status">Loading tasks…</p>}

      {!isLoading && tasks.length === 0 && (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon} aria-hidden="true"><span /></span>
          <p>No tasks yet</p>
          <span>Add your first task to get started.</span>
        </div>
      )}

      {tasks.length > 0 && (
        <ul className={styles.taskList} role="list" aria-label="Tasks">
          {tasks.map((task) => (
            <li className={`${styles.taskRow} ${task.completed ? styles.completed : ""}`} key={task.id}>
              <label className={styles.taskLabel}>
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                <span>{task.text}</span>
              </label>
              <button
                className={styles.deleteButton}
                type="button"
                aria-label={`Delete task ${task.text}`}
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
