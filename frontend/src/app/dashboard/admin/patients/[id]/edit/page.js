import PatientForm from "../../PatientForm";

export default async function Page(props) {
  const params = await props.params;

  return <PatientForm params={params} />;
}
