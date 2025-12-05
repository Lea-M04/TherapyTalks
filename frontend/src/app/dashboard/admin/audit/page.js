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
      <h1 className="text-2xl text-primary-dark font-bold mb-4">Audit Logs</h1>

      <table className="w-full text-primary-dark border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Action</th>
            <th className="p-2 border">Target Type</th>
            <th className="p-2 border">Target ID</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Timestamp</th>
            <th className="p-2 border">User</th>
          </tr>
        </thead>

        <tbody>
          {logs.map(log => (
            <tr key={log.logID}>
              <td className="p-2 border">{log.logID}</td>
              <td className="p-2 border">{log.action}</td>
              <td className="p-2 border">{log.targetType}</td>
              <td className="p-2 border">{log.targetID ?? "-"}</td>
              <td className="p-2 border">{log.status}</td>
              <td className="p-2 border">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="p-2 border">
                {log.user ? `${log.user.firstName} ${log.user.lastName}` : "System"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
  disabled={!pagination.prev_page_url}
  onClick={() => loadPage(pagination.current_page - 1)}
>
  Prev
</button>

<button
  disabled={!pagination.next_page_url}
  onClick={() => loadPage(pagination.current_page + 1)}
>
  Next
</button>
    </div>
  );
}
