import React, { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Pagination from "./components/Pagination";
import "./index.css";

const ITEMS_PER_PAGE = 5;

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/todos?limit=100");
      const data = await res.json();
      const withDates = data.todos.map((todo) => ({
        ...todo,
        date: randomDate()
      }));
      setTodos(withDates);
      setFilteredTodos(withDates);
    } catch (error) {
      alert("Failed to fetch todos.");
    } finally {
      setLoading(false);
    }
  };

  const randomDate = () => {
    const start = new Date(2024, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };

  const handleAdd = (newTodo) => {
    setTodos([newTodo, ...todos]);
    setFilteredTodos([newTodo, ...filteredTodos]);
    setCurrentPage(1);
  };

  const handleFilter = () => {
    let filtered = [...todos];

    if (search) {
      filtered = filtered.filter((todo) =>
        todo.todo.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (fromDate) {
      filtered = filtered.filter((todo) => new Date(todo.date) >= new Date(fromDate));
    }

    if (toDate) {
      filtered = filtered.filter((todo) => new Date(todo.date) <= new Date(toDate));
    }

    setFilteredTodos(filtered);
    setCurrentPage(1);
  };

  const handleClear = () => {
    setSearch("");
    setFromDate("");
    setToDate("");
    setFilteredTodos(todos);
    setCurrentPage(1);
  };


  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Todo List App</h2>
      <TodoForm onAdd={handleAdd} />

      <div className="flex flex-wrap items-end gap-4 mb-4">
        <div className="flex flex-col w-64">
          <label className="text-sm font-medium text-gray-700 mb-1">Search By Name</label>
          <input
            className="form-input border border-gray-300 rounded px-3 py-2"
            placeholder="Search by task"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-52">
          <label className="text-sm font-medium text-gray-700 mb-1">From Date</label>
          <input
            type="date"
            className="form-input border border-gray-300 rounded px-3 py-2"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-52">
          <label className="text-sm font-medium text-gray-700 mb-1">To Date</label>
          <input
            type="date"
            className="form-input border border-gray-300 rounded px-3 py-2"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-28">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-3 py-2" onClick={handleFilter}>
            Filter
          </button>
        </div>

        <div className="flex flex-col w-28">
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded px-3 py-2" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>


      {loading ? (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <>
          <TodoList todos={paginatedTodos} />
          <Pagination
            total={filteredTodos.length}
            perPage={ITEMS_PER_PAGE}
            current={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default App;
