import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./slices/authSlice";
import { TodoProvider } from "./contexts";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import { clearWeatherError } from "./slices/weatherSlice";

function App() {
    const [todos, setTodos] = useState([]);
    const [apiError, setApiError] = useState(null);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const user = useSelector((state) => state.auth.user);
    const weatherError = useSelector((state) => state.weather.error);
    const dispatch = useDispatch();

    // Mock login function
    const handleLogin = () => {
        dispatch(login({ username: "User123" }));
    };

    // Mock signup function
    const handleSignup = () => {
        dispatch(login({ username: "NewUser" }));
    };

    // Logout function
    const handleLogout = () => {
        dispatch(logout());
    };

    // Todo functions
    const addTodo = (todo) => {
        setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
    };

    const updateTodo = (id, todo) => {
        setTodos((prev) =>
            prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
        );
    };

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    const toggleComplete = (id) => {
        setTodos((prev) =>
            prev.map((prevTodo) =>
                prevTodo.id === id
                    ? { ...prevTodo, completed: !prevTodo.completed }
                    : prevTodo
            )
        );
    };

    useEffect(() => {
        if (weatherError) {
            setApiError(`Weather Error: ${weatherError}`);
            const timer = setTimeout(() => {
                setApiError(null);
                dispatch(clearWeatherError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [weatherError, dispatch]);

    useEffect(() => {
        const todos = JSON.parse(localStorage.getItem("todos"));
        if (todos && todos.length > 0) {
            setTodos(todos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
            <div className="bg-[#172842] min-h-screen py-8">
                {apiError && (
                    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-50 max-w-xs">
                        <p>{apiError}</p>
                        <button 
                            onClick={() => {
                                setApiError(null);
                                dispatch(clearWeatherError());
                            }} 
                            className="absolute top-1 right-1 text-xs"
                        >
                            ×
                        </button>
                    </div>
                )}
                
                {/* Header Section */}
                <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
                    <h1 className="text-xl font-bold">To-Do App</h1>
                    <div className="flex gap-2">
                        {!isAuthenticated ? (
                            <>
                                <button
                                    onClick={handleLogin}
                                    className="bg-blue-600 px-4 py-2 rounded"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={handleSignup}
                                    className="bg-green-600 px-4 py-2 rounded"
                                >
                                    Signup
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="px-4 py-2">Welcome, {user}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 px-4 py-2 rounded"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </header>

                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    {isAuthenticated ? (
                        <>
                            {/* Add Todo Button */}
                            <div className="flex justify-between items-center my-4">
                                <h2 className="text-xl font-semibold">Manage Your Todos</h2>
                            </div>

                            {/* Todo Form */}
                            <div className="mb-4">
                                <TodoForm />
                            </div>

                            {/* Show All Todos Section */}
                            <h2 className="text-lg font-semibold mb-2">All Todos</h2>
                            <div className="flex flex-wrap gap-y-3">
                                {todos.map((todo) => (
                                    <div key={todo.id} className="w-full">
                                        <TodoItem todo={todo} />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-300">
                            Please log in to manage your todos.
                        </p>
                    )}
                </div>
            </div>
        </TodoProvider>
    );
}

export default App;
