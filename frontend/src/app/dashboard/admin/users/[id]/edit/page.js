import UserForm from "../../UserForm";

export default async function Page(props) {
  const params = await props.params;

  return <UserForm params={params} />;
}
