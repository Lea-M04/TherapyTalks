import Link from "next/link";
import VerificationStatusTag from "../professionals/VerificationStatusTag";

export default function VerificationCard({ request }) {
  return (
    <Link
  href={`/dashboard/admin/verification/${request.requestID}`}
  className="block p-4 border rounded shadow hover:shadow-md transition"
>
  <div className="flex justify-between items-start">
    <div>
      <p className="font-semibold">{request.documentType}</p>
      <p className="text-sm text-gray-500">{request.status}</p>
    </div>
    <span className="text-xs">{request.submittedAt}</span>
  </div>
</Link>

  );
}