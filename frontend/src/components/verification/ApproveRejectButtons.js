"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { approveRequest, rejectRequest } from "@/lib/verification";
import RejectModal from "./RejectModal";

export default function ApproveRejectButtons({ requestID }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showReject, setShowReject] = useState(false);

  const handleApprove = async () => {
    if (!confirm("Confirm approve this verification request?")) return;
    setLoading(true);
    try {
      await approveRequest(requestID);
      router.refresh(); 
      alert("Approved");
    } catch (err) {
      console.error(err);
      alert("Failed to approve");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (data) => {
    setLoading(true);
    try {
      await rejectRequest(requestID, data);
      router.refresh();
      alert("Rejected");
    } catch (err) {
      console.error(err);
      alert("Failed to reject");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-3">
        <button
          disabled={loading}
          onClick={handleApprove}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Approve
        </button>

        <button
          disabled={loading}
          onClick={() => setShowReject(true)}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Reject
        </button>
      </div>

      {showReject && (
        <RejectModal
          onClose={() => setShowReject(false)}
          onSubmit={(data) => {
            handleReject(data);
            setShowReject(false);
          }}
        />
      )}
    </>
  );
}
