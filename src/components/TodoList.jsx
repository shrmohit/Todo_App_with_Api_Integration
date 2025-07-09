import React from "react";

function TodoList({ todos }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center">
                No todos found.
              </td>
            </tr>
          ) : (
            todos.map((todo, index) => (
              <tr key={todo.id}>
                <td>{index + 1}</td>
                <td>{todo.todo}</td>
                <td>{new Date(todo.date).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
