"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
    const [pagination, setPagination] = useState({});
const loadPage = (page) => {
  api.get(`/audit_logs?page=${page}`).then(res => {
    setLogs(res.data.data);
    setPagination(res.data);
  });
};
  useEffect(() => {
    api.get("/audit_logs")
      .then(res => {  
          setLogs(res.data.data);
      setPagination(res.data); 
      })
      .catch(err => console.error(err));
  }, []);

  return (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink text-transparent bg-clip-text">
        Audit Logs
      </h1>
    </div>

    <div className="overflow-hidden rounded-lg border border-primary/20 shadow-sm bg-white">
      <table className="w-full text-primary-dark">
        <thead className="bg-primary/20">
          <tr>
            {[
              "ID",
              "Action",
              "Target Type",
              "Target ID",
              "Status",
              "Timestamp",
              "User"
            ].map((h) => (
              <th
                key={h}
                className="p-3 border border-primary/10 text-left text-sm font-semibold"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.logID} className="hover:bg-primary-pink/10 transition">
              <td className="p-3 border border-primary/10">{log.logID}</td>
              <td className="p-3 border border-primary/10">{log.action}</td>
              <td className="p-3 border border-primary/10">{log.targetType}</td>
              <td className="p-3 border border-primary/10">
                {log.targetID ?? "-"}
              </td>
              <td className="p-3 border border-primary/10">{log.status}</td>
              <td className="p-3 border border-primary/10">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="p-3 border border-primary/10">
                {log.user
                  ? `${log.user.firstName} ${log.user.lastName}`
                  : "System"}
              </td>
            </tr>
          ))}

          {logs.length === 0 && (
            <tr>
              <td
                colSpan="7"
                className="p-4 text-center text-primary-dark"
              >
                No logs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="flex justify-center items-center gap-6 mt-6 text-primary-dark">
      <button
        disabled={!pagination.prev_page_url}
        onClick={() => loadPage(pagination.current_page - 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Prev
      </button>

      <button
        disabled={!pagination.next_page_url}
        onClick={() => loadPage(pagination.current_page + 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Next
      </button>
    </div>
  </div>
);
}