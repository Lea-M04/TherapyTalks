import BookingForm from "../../BookingForm";

export default async function Page(props) {
  const params = await props.params;
  return <BookingForm params={params} />;
}
