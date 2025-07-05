import { useDispatch, useSelector } from "react-redux";
import {
  toggleComplete,
  deleteTodo,
  editTodo,
  setSearchFilter,
  setFilterStatus,
} from "../redux/features/todos/todoSlice";
import { FaCheck, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { useState } from "react";

const TodoList = () => {
  const { todos, filter } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const filteredTodos = todos
    .filter((todo) => {
      if (filter.status === "completed") return todo.completed;
      if (filter.status === "pending") return !todo.completed;
      return true;
    })
    .filter((todo) =>
      todo.text.toLowerCase().includes(filter.search.toLowerCase())
    );

  const handleSave = (id) => {
    if (editText.trim() !== "") {
      dispatch(editTodo({ todoId: id, newText: editText.trim() }));
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Todos"
        value={filter.search}
        onChange={(e) => dispatch(setSearchFilter(e.target.value))}
        className="text-black w-full p-2 border rounded mb-4 focus:outline-none focus:border-[#f5788f]"
      />
      <div className="flex gap-4 mb-4">
        {["all", "completed", "pending"].map((status) => (
          <button
            onClick={() => dispatch(setFilterStatus(status))}
            className={`px-2 py-1 rounded border ${
              filter.status === status ? "bg-[#f5788f]" : ""
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {filteredTodos.length === 0 && <p>No Todos</p>}
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between group">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleComplete(todo.id))}
                className="sr-only peer"
              />

              <div className="w-5 h-5 rounded-full border-2 border-[#F49BAB] peer-checked:bg-[#F49BAB] flex items-center justify-center transition">
                {todo.completed && (
                  <FaCheck className="text-white text-[10px]" />
                )}
              </div>

              {editId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave(todo.id);
                  }}
                  className="outline-none border border-[#F49BAB] rounded px-1 py-0.5 text-sm text-gray-700 focus:outline-none flex-grow"
                  autoFocus
                />
              ) : (
                <span
                  className={
                    todo.completed
                      ? "line-through text-gray-700"
                      : "text-gray-700"
                  }
                >
                  {todo.text}
                </span>
              )}
            </label>

            <div className="flex items-center space-x-3">
              {editId === todo.id ? (
                <button
                  onClick={() => handleSave(todo.id)}
                  aria-label="Save Todo"
                  className="text-[#F49BAB] hover:text-[#f5788f] transition text-sm"
                >
                  <FaSave size={16} />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditId(todo.id);
                      setEditText(todo.text);
                    }}
                    aria-label="Edit Todo"
                    className="text-[#F49BAB] hover:text-[#f5788f] transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    aria-label="Delete Todo"
                    className="text-[#F49BAB] hover:text-[#f5788f] transition"
                  >
                    <FaTrash />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
