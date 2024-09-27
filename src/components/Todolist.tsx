"use client";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Todolist = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showList, setShowList] = useState(true);

  // Add new todo
  const addTodo = () => {
    if (inputValue.trim() === "") return;
    setTodos([
      ...todos,
      { id: Date.now(), text: inputValue, completed: false },
    ]);
    setInputValue("");
  };

  // Toggle completion status
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle visibility of todo list
  const toggleListView = () => {
    setShowList(!showList);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-teal-500 text-white py-6 shadow-md">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold">Todo List by Vandana</h1>
          <p className="mt-2 text-lg">
            Organize your tasks with our sleek Next.js Todo List App.
          </p>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-xl">
          <div className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Add a new task..."
              />
              <button
                onClick={addTodo}
                className="ml-3 px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                Add
              </button>
            </div>
          </div>

          <div className="mb-4">
            <button
              onClick={toggleListView}
              className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              {showList ? "Hide List" : "View List"}
            </button>
          </div>

          {showList && (
            <ul className="space-y-3">
              {todos.length === 0 ? (
                <li className="text-center text-gray-500">No tasks added yet.</li>
              ) : (
                todos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`flex items-center justify-between p-3 rounded-lg shadow-md transition ${
                      todo.completed ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    <span
                      className={`${
                        todo.completed ? "line-through text-gray-500" : "text-gray-800"
                      }`}
                    >
                      {todo.text}
                    </span>

                    <div className="space-x-2">
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className={`px-3 py-1 text-sm rounded-lg shadow-md transition duration-300 ease-in-out ${
                          todo.completed
                            ? "bg-yellow-400 text-black hover:bg-yellow-500"
                            : "bg-green-400 text-white hover:bg-green-500"
                        }`}
                      >
                        {todo.completed ? "Undo" : "Complete"}
                      </button>

                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default Todolist;
