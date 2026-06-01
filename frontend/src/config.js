// Central place for the backend base URL.
// Override at build time with VITE_API_BASE if needed.
export const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";
