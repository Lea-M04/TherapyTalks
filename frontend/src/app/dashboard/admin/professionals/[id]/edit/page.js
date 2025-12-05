import ProfessionalForm from "../../ProfessionalForm";

export default async function Page(props) {
  const params = await props.params;

  return <ProfessionalForm params={params} />;
}
