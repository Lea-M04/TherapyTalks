import { getProfessionals } from "@/lib/professionals";
import ProfessionalCard from "@/components/professionals/ProfessionalCard";

export default async function ProfessionalsPage() {
    const professionals = await getProfessionals();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {professionals.map((p) => (
                <ProfessionalCard key={p.professionalID} professional={p} />
            ))}
        </div>
    );
}
