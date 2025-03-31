import React, { useState, useEffect } from "react";
import { useTodo } from "../contexts/TodoContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather, clearWeatherError } from "../slices/weatherSlice";

function TodoItem({ todo }) {
  const [isEditable, setIsEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [priority, setPriority] = useState(todo.priority);
  const [showWeather, setShowWeather] = useState(false);
  
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const { data: weather, loading, error } = useSelector((state) => state.weather);
  const dispatch = useDispatch();

  const outdoorKeywords = ["outdoor","weather", "park", "walk", "hike", "garden", "beach", "run", "bike"];
  const isOutdoorActivity = outdoorKeywords.some(keyword => 
    todo.todo.toLowerCase().includes(keyword)
  );

  const priorityColors = {
    High: "text-red-500 font-bold",
    Medium: "text-yellow-500 font-semibold",
    Low: "text-green-500 font-medium",
  };

  const handleWeatherClick = () => {
    if (isOutdoorActivity && !showWeather) {
      const city = todo.location || "Delhi"; // Default city
      dispatch(fetchWeather(city));
    }
    setShowWeather(!showWeather);
  };

  const saveTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg, priority });
    setIsEditable(false);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearWeatherError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <div className={`flex flex-col border border-black/10 rounded-lg px-3 py-1.5 shadow-sm shadow-white/50 duration-300 text-black ${
      todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
    }`}>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-x-3 w-full">
          <input
            type="checkbox"
            className="cursor-pointer"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />

          <input
            type="text"
            className={`border outline-none w-full bg-transparent rounded-lg ${
              isEditable ? "border-black/10 px-2" : "border-transparent"
            } ${todo.completed ? "line-through" : ""}`}
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isEditable}
          />

          {isEditable ? (
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border border-black/10 rounded px-2 py-1 bg-white/20"
            >
              <option value="High">🔥 High</option>
              <option value="Medium">⚡ Medium</option>
              <option value="Low">📌 Low</option>
            </select>
          ) : (
            <span className={`text-sm ${priorityColors[todo.priority]}`}>
              {todo.priority}
            </span>
          )}

          <button
            className="w-8 h-8 rounded-lg text-sm border border-black/10 bg-gray-50 hover:bg-gray-100"
            onClick={() => {
              if (todo.completed) return;
              if (isEditable) saveTodo();
              else setIsEditable(true);
            }}
            disabled={todo.completed}
          >
            {isEditable ? "📁" : "✏️"}
          </button>

          <button
            className="w-8 h-8 rounded-lg text-sm border border-black/10 bg-gray-50 hover:bg-gray-100"
            onClick={() => deleteTodo(todo.id)}
          >
            ❌
          </button>

          {isOutdoorActivity && (
            <button
              className={`w-8 h-8 rounded-lg text-sm border border-black/10 ${
                showWeather ? "bg-blue-200" : "bg-blue-100"
              } hover:bg-blue-200`}
              onClick={handleWeatherClick}
              title="Check weather"
            >
              {weather?.weather[0]?.main.includes("Rain") ? "🌧️" : 
               weather?.weather[0]?.main.includes("Cloud") ? "☁️" : "☀️"}
            </button>
          )}
        </div>
      </div>

      {showWeather && isOutdoorActivity && (
        <div className="mt-2 p-2 bg-white/30 rounded">
          {loading && <p className="text-sm">Loading weather...</p>}
          {error && (
            <p className="text-red-500 text-sm">
              Error: {error}
            </p>
          )}
          {weather && !loading && !error && (
            <div className="flex items-center gap-2 text-sm">
              <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].description}
                className="w-10 h-10"
              />
              <div>
                <p className="font-medium">
                  {weather.name}: {weather.weather[0].main} 
                  <span className="text-gray-600"> ({weather.weather[0].description})</span>
                </p>
                <p>🌡️ Temp: {Math.round(weather.main.temp)}°C (Feels like: {Math.round(weather.main.feels_like)}°C)</p>
                <p>💧 Humidity: {weather.main.humidity}% | 🌬️ Wind: {weather.wind.speed} m/s</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TodoItem;