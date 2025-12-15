import Link from "next/link";
import VerificationStatusTag from "../professionals/VerificationStatusTag";

export default function VerificationCard({ request }) {
  return (
  <Link
    href={`/dashboard/admin/verification/${request.requestID}`}
    className="block p-4 rounded-lg border border-primary/20 bg-white shadow-sm 
               hover:shadow-md hover:bg-primary-pink/10 transition"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="font-semibold text-primary-dark">{request.documentType}</p>
        <p className="text-sm text-primary-purple">{request.status}</p>
      </div>

      <span className="text-xs text-primary-dark">
        {request.submittedAt.split("T")[0]}
      </span>
    </div>
  </Link>
);
}