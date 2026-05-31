"use client";

import { useMemo, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

const PAGE_SIZE = 10;
const PREVIEW_LIMIT = 42;

function getPreview(value) {
  if (!value) return "-";

  const text = String(value);
  return text.length > PREVIEW_LIMIT
    ? `${text.slice(0, PREVIEW_LIMIT).trim()}...`
    : text;
}

function escapeCsvValue(value) {
  const text = String(value || "");
  return `"${text.replaceAll('"', '""')}"`;
}

export default function AdminPaginatedTable({
  title,
  totalLabel,
  columns,
  rows,
  deleteEndpoint,
}) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [deletingId, setDeletingId] = useState("");
  const [deletedIds, setDeletedIds] = useState([]);
  const [rowToDelete, setRowToDelete] = useState(null);

  const searchableColumns = useMemo(
    () => columns.filter((column) => column.key !== "status"),
    [columns]
  );

  const activeRows = useMemo(
    () => rows.filter((row) => !deletedIds.includes(row.id)),
    [deletedIds, rows]
  );

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return activeRows;

    return activeRows.filter((row) =>
      searchableColumns.some((column) =>
        String(row[column.key] || "").toLowerCase().includes(query)
      )
    );
  }, [activeRows, searchTerm, searchableColumns]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const visibleRows = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredRows.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredRows]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleDelete = async (row) => {
    if (!deleteEndpoint || !row.id) return;

    try {
      setDeletingId(row.id);
      const response = await fetch(`${deleteEndpoint}/${row.id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to delete enquiry.");
      }

      setDeletedIds((currentIds) => [...currentIds, row.id]);
      setSelectedRow((currentRow) =>
        currentRow?.id === row.id ? null : currentRow
      );
      setRowToDelete(null);
    } catch (error) {
      window.alert(error.message || "Something went wrong while deleting.");
    } finally {
      setDeletingId("");
    }
  };

  const handleExportCsv = () => {
    const exportColumns = columns.filter((column) => column.key !== "status");
    const headers = ["Sr. No.", ...exportColumns.map((column) => column.label)];
    const csvRows = filteredRows.map((row, index) => [
      index + 1,
      ...exportColumns.map((column) => row[column.key] || ""),
    ]);
    const csvContent = [headers, ...csvRows]
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const fileName = `${title.toLowerCase().replaceAll(" ", "-")}-enquiries.csv`;

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="admin-table-card">
      <div className="admin-table-head">
        <div>
          <h2>{title}</h2>
          <span>
            {filteredRows.length} of {activeRows.length} {totalLabel}
          </span>
        </div>

        <label className="admin-search-box">
          <FaSearch aria-hidden="true" />
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search enquiries..."
            aria-label={`Search ${title}`}
          />
        </label>

        <button
          type="button"
          className="admin-export-btn"
          onClick={handleExportCsv}
          disabled={filteredRows.length === 0}
        >
          <FaDownload aria-hidden="true" />
          Export CSV
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th className="admin-serial-col">Sr. No.</th>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length > 0 ? (
              visibleRows.map((row, index) => (
                <tr key={`${row.id || row.email || row.phone}-${index}`}>
                  <td className="admin-serial-col">
                    {(currentPage - 1) * PAGE_SIZE + index + 1}
                  </td>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.key === "status" ? (
                        <div className="admin-status-cell">
                          <button
                            type="button"
                            className="admin-view-btn"
                            onClick={() => setSelectedRow(row)}
                          >
                            View
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`admin-table-preview ${
                            column.key === "phone" ? "admin-nowrap" : ""
                          }`}
                        >
                          {getPreview(row[column.key])}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="admin-empty-cell" colSpan={columns.length + 1}>
                  No enquiries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="admin-pagination">
        <button
          type="button"
          aria-label="Previous page"
          disabled={currentPage === 1}
          onClick={() => setPage((current) => Math.max(1, current - 1))}
        >
          <FaChevronLeft />
        </button>

        <span>
          {currentPage} of {totalPages} pages
        </span>

        <button
          type="button"
          aria-label="Next page"
          disabled={currentPage === totalPages}
          onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
        >
          <FaChevronRight />
        </button>
      </div>

      {selectedRow && (
        <div className="admin-view-backdrop" role="presentation">
          <div
            className="admin-view-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-view-title"
          >
            <button
              type="button"
              className="admin-view-close"
              aria-label="Close enquiry details"
              onClick={() => setSelectedRow(null)}
            >
              <FaTimes />
            </button>

            <div className="admin-view-head">
              <p>Enquiry Details</p>
              <h2 id="admin-view-title">{selectedRow.name || "Submitted Enquiry"}</h2>
              <span>Full details submitted by the user.</span>
            </div>

            <div className="admin-view-grid">
              {columns.filter((column) => column.key !== "status").map((column) => (
                <article key={column.key}>
                  <span>{column.label}</span>
                  <strong>{selectedRow[column.key] || "-"}</strong>
                </article>
              ))}
            </div>

            {deleteEndpoint && (
              <div className="admin-view-actions">
                <button
                  type="button"
                  className="admin-modal-delete-btn"
                  onClick={() => setRowToDelete(selectedRow)}
                >
                  Delete Enquiry
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {rowToDelete && (
        <div className="admin-confirm-backdrop" role="presentation">
          <div
            className="admin-confirm-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-confirm-title"
          >
            <h2 id="admin-confirm-title">Delete this enquiry?</h2>
            <p>
              Are you sure you want to delete this? This action cannot be undone.
            </p>
            <div className="admin-confirm-actions">
              <button
                type="button"
                className="admin-confirm-cancel"
                onClick={() => setRowToDelete(null)}
                disabled={deletingId === rowToDelete.id}
              >
                Cancel
              </button>
              <button
                type="button"
                className="admin-confirm-delete"
                onClick={() => handleDelete(rowToDelete)}
                disabled={deletingId === rowToDelete.id}
              >
                {deletingId === rowToDelete.id ? "Deleting..." : "OK, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
