// src/components/Review/RatingInput.jsx
export default function RatingInput({ value, onChange }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => onChange(star)}
          className="text-2xl focus:outline-none"
        >
          <span className={star <= value ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}
