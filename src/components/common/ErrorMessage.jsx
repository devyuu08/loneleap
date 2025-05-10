export default function ErrorMessage({ message }) {
  if (!message) return null;

  return <p className="text-sm text-gray-600 mt-1">{message}</p>;
}
