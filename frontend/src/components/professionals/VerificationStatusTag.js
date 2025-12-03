export default function VerificationStatusTag({ status }) {
    const colors = {
        verified: "bg-green-100 text-green-600",
        pending: "bg-yellow-100 text-yellow-600",
        rejected: "bg-red-100 text-red-600",
    };

    return (
        <span className={`px-2 py-1 rounded text-xs ${colors[status]}`}>
            {status}
        </span>
    );
}
