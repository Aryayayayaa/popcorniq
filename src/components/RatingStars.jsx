function RatingStars({ rating = 0, max = 5, onChange }) {
  return (
    <div className="flex gap-1 text-lg">
      {Array.from({ length: max }, (_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onChange?.(index + 1)}
          className="transition-colors"
        >
          {index < rating ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}

export default RatingStars;
