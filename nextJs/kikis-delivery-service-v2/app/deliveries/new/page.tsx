import addDelivery from "../actions";

export default function NewDeliveryPage() {
  return (
    <form action={addDelivery}>
      <input name="pickup" placeholder="Pickup" />
      <input name="destination" placeholder="Destination" />
      <button
        type="submit"
        className="bg-brand px-4 py-2 text-white hover:bg-brand-muted"
      >
        Create request
      </button>
    </form>
  );
}
