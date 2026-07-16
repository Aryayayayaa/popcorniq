/**
 * Browse page pagination controls.
 */
function Pagination({ currentPage, totalPages, onPrevious, onNext }) {
  return (
    <div className="mt-10 flex items-center justify-center gap-6">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="
          rounded-lg
          bg-slate-800
          px-5
          py-2
          text-white
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Previous
      </button>

      <span className="rounded-lg bg-slate-200 px-4 py-2 font-semibold">
        {currentPage}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="
          rounded-lg
          bg-slate-800
          px-5
          py-2
          text-white
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
