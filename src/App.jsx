import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 bg-[url('../assets/bg_img.jpg')] bg-repeat-x bg-cover animate-scroll"></div>
      <div className="relative z-10 max-w-xl mx-auto p-4 text-white">
        <h1 className="text-2xl font-bold mb-4 pt-16">Todo App</h1>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
