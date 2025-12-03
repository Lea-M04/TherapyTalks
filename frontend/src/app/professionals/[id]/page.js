import { getProfessionalById } from "@/lib/professionals";
import ProfessionalDetails from "@/components/professionals/ProfessionalDetails";

export default async function ProfessionalDetailsPage({ params }) {
    const id = (await params).id;
    const professional = await getProfessionalById(id);
    return (
        <div>
            <ProfessionalDetails professional={professional} />
        </div>
    );
}

