import { useEffect, useState } from "react";
import "./App.css";
import { FaPlus, FaCheck } from "react-icons/fa";
import { db } from "./firebase";
import {
  addDoc,
  doc,
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "todos"), (snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
      );
    }, (error) => {
      console.error("Firestore Error:", error);
    });

    return () => unsubscribe();
  }, []);

  const handleAddOrUpdate = async () => {
    try {
      if (input.trim() === "") return;
      if (editIndex === -1) {
        await addDoc(collection(db, "todos"), { todo: input });
      } else {
        const todoDocRef = doc(db, "todos", todos[editIndex].id);
        await updateDoc(todoDocRef, { todo: input });
        setEditIndex(-1);
      }
      setInput("");
    } catch (error) {
      console.error("Error handling todo:", error.message);
    }
  };

  const handleEdit = (index) => {
    if (index >= 0 && index < todos.length) {
      setInput(todos[index].todo);
      setEditIndex(index);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 bg-custom-background bg-center bg-cover">
      <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4">ToDo App</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a todo"
            className="py-2 px-4 border rounded w-full focus:outline-none mr-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-4 rounded"
            onClick={handleAddOrUpdate}
          >
            {editIndex === -1 ? <FaPlus /> : <FaCheck />}
          </button>
        </div>
      </div>
      {todos.length > 0 && (
        <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default App;
