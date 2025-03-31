import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [location, setLocation] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    
    const todoData = { 
      todo, 
      completed: false, 
      priority,
      ...(location && { location })
    };
    
    addTodo(todoData);
    setTodo("");
    setPriority("Medium");
    setLocation("");
  };

  const isOutdoorActivity = ["walk", "hike", "park", "outdoor", "garden", "beach", "run", "bike"].some(
    word => todo.toLowerCase().includes(word)
  );

  const priorityStyles = {
    High: "bg-red-500 text-white",
    Medium: "bg-yellow-500 text-white",
    Low: "bg-green-500 text-white",
  };

  return (
    <form onSubmit={add} className="flex flex-col gap-2">
      <div className="flex">
        <input
          type="text"
          placeholder="Write Todo..."
          className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={`border border-black/10 px-2 py-1 rounded-none ${priorityStyles[priority]} duration-150`}
        >
          <option value="High" className="bg-red-500 text-white">🔥 High</option>
          <option value="Medium" className="bg-yellow-500 text-white">⚡ Medium</option>
          <option value="Low" className="bg-green-500 text-white">📌 Low</option>
        </select>

        <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
          Add
        </button>
      </div>

      {isOutdoorActivity && (
        <input
          type="text"
          placeholder="Location (e.g., 'New York') - optional"
          className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      )}
    </form>
  );
}

export default TodoForm;
