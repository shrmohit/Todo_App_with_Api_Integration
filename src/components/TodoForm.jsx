import React, { useState } from "react";

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date) return alert("Please fill all fields.");

    try {
      const res = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: title,
          completed: false,
          userId: 5
        })
      });

      const data = await res.json();
      onAdd({ ...data, date: new Date(date) });
      setTitle("");
      setDate("");
    } catch (err) {
      alert("Error adding todo.");
    }
  };

  return (
    <form className="flex  gap-3 mb-4" onSubmit={handleSubmit}>
      <div className="flex flex col col-md-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="col-md-2">
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="col-md-2">
        <button type="submit" className="btn btn-success w-100">
          Add Todo
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
