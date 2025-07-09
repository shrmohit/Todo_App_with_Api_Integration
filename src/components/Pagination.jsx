import React from "react";

function Pagination({ total, perPage, current, onPageChange }) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {Array.from({ length: pages }, (_, i) => (
          <li
            key={i}
            className={`page-item ${i + 1 === current ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(i + 1)}>
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
