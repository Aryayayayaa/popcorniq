function Pagination() {
  return (
    <div className="mt-10 flex justify-center gap-4">
      <button
        className="
          rounded-lg
          bg-slate-800
          px-5
          py-2
          text-white
        "
      >
        Previous
      </button>

      <button
        className="
          rounded-lg
          bg-slate-800
          px-5
          py-2
          text-white
        "
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
