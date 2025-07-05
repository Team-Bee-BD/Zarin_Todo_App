import { useDispatch, useSelector } from "react-redux";
import {
  toggleComplete,
  deleteTodo,
  editTodo,
} from "../redux/features/todos/todoSlice";
import { FaCheck, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import { useState } from "react";

const TodoList = () => {
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleSave = (id) => {
    if (editText.trim() !== "") {
      dispatch(editTodo({ todoId: id, newText: editText.trim() }));
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <div>
      <ul className="space-y-2">
        {todos.length === 0 && <p>No Todos</p>}
        {todos.map((todo) => (
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
