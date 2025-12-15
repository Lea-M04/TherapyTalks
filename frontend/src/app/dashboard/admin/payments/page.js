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

    <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r 
        from-primary-dark via-primary-purple to-primary-pink 
        text-transparent bg-clip-text">
      Payments
    </h1>

    <div className="overflow-hidden rounded-lg border border-primary/20 shadow-sm bg-white">
      <table className="w-full text-primary-dark">
        <thead className="bg-primary/20">
          <tr>
            {[
              "ID",
              "Booking",
              "Patient",
              "Amount (€)",
              "Status",
              "Provider",
              "Transaction",
              "Created",
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
          {payments.map((p) => (
            <tr
              key={p.paymentID}
              className="hover:bg-primary-pink/10 transition"
            >
              <td className="p-3 border border-primary/10">{p.paymentID}</td>

              <td className="p-3 border border-primary/10">
                {p.booking?.service?.name ?? "-"}
              </td>

              <td className="p-3 border border-primary/10">
                {p.patient?.user
                  ? `${p.patient.user.firstName} ${p.patient.user.lastName}`
                  : "-"}
              </td>

              <td className="p-3 border border-primary/10">{p.amount}</td>

              <td className="p-3 border border-primary/10 font-semibold">
                {p.status}
              </td>

              <td className="p-3 border border-primary/10">{p.provider}</td>

              <td className="p-3 border border-primary/10">
                {p.transactionID ?? "-"}
              </td>

              <td className="p-3 border border-primary/10">
                {new Date(p.created_at).toLocaleString()}
              </td>
            </tr>
          ))}

          {payments.length === 0 && (
            <tr>
              <td
                colSpan="8"
                className="p-4 text-center text-primary-dark"
              >
                No payments found
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
