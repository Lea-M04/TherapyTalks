import ServiceForm from "../../ServiceForm";

export default async function Page(props) {
  const params = await props.params;

  return <ServiceForm params={params} />;
}
