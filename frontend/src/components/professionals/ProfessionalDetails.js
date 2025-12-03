export default function ProfessionalDetails({ professional }) {
    const user = professional.user || {};

    return (
        <div className="p-6 border rounded-xl shadow space-y-4">

          
            <h1 className="text-3xl font-semibold">
                {user.firstName} {user.lastName}
            </h1>

            <div className="text-gray-700">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phoneNumber}</p>
            </div>

            {user.profileImage && (
                <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover border"
                />
            )}

         
            <p className="text-lg font-medium text-gray-800">
                {professional.specialization}
            </p>

          
            <p className="text-gray-600">
                <strong>Experience:</strong> {professional.experienceYears} years
            </p>

            {professional.education && (
                <p className="text-gray-700">
                    <strong>Education:</strong> {professional.education}
                </p>
            )}

            {professional.bio && (
                <p className="text-gray-700 whitespace-pre-line">
                    <strong>Bio:</strong> {professional.bio}
                </p>
            )}

           
            <div className="text-gray-700">
                <p><strong>Clinic Name:</strong> {professional.clinicName}</p>
                <p><strong>Street:</strong> {professional.clinicStreet}</p>
                <p><strong>City:</strong> {professional.clinicCity}</p>
            </div>

            <p className="text-gray-700">
                <strong>Rating:</strong> {professional.rating ?? "No ratings yet"}
            </p>

          
            <div className="flex items-center gap-3 mt-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
                    {professional.status}
                </span>

                <span
                    className={`px-3 py-1 rounded ${
                        professional.isOnline ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
                    }`}
                >
                    {professional.isOnline ? "Online" : "Offline"}
                </span>
            </div>

           
        </div>
    );
}
