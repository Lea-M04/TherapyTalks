"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [pagination, setPagination] = useState({});

  const loadPage = (page) => {
    api.get(`/payments?page=${page}`).then(res => {
      setPayments(res.data.data);
      setPagination(res.data);
    });
  };

  useEffect(() => {
    api.get("/payments")
      .then(res => {
        setPayments(res.data.data);
        setPagination(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-primary-dark font-bold mb-4">
        Payments
      </h1>

      <table className="w-full text-primary-dark border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Booking</th>
            <th className="p-2 border">Patient</th>
            <th className="p-2 border">Amount (€)</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Provider</th>
            <th className="p-2 border">Transaction</th>
            <th className="p-2 border">Created</th>
          </tr>
        </thead>

        <tbody>
          {payments.map(p => (
            <tr key={p.paymentID}>
              <td className="p-2 border">{p.paymentID}</td>
              <td className="p-2 border">{p.booking?.service?.name ?? "-"}</td>
              <td className="p-2 border">{p.patient?.user
    ? `${p.patient.user.firstName} ${p.patient.user.lastName}`: "-"}</td>
              <td className="p-2 border">{p.amount}</td>
              <td className="p-2 border font-semibold">
                {p.status}
              </td>
              <td className="p-2 border">{p.provider}</td>
              <td className="p-2 border">
                {p.transactionID ?? "-"}
              </td>
              <td className="p-2 border">
                {new Date(p.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-6 mt-6">
        <button
          disabled={!pagination.prev_page_url}
          onClick={() => loadPage(pagination.current_page - 1)}
          className="text-primary-dark font-bold text-lg disabled:opacity-40"
        >
          Prev
        </button>

        <button
          disabled={!pagination.next_page_url}
          onClick={() => loadPage(pagination.current_page + 1)}
          className="text-primary-dark font-bold text-lg disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
