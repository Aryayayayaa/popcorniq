// Browse page pagination controls.

function Pagination({ currentPage, totalPages, onPrevious, onNext }) {
  return (
    <div
      className="
        mt-10
        flex
        flex-wrap
        items-center
        justify-center
        gap-4
        sm:gap-6
      "
    >
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="
          rounded-lg
          bg-slate-800
          w-full
          px-5
          py-2
          sm:w-auto
          text-white
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Previous
      </button>

      <span
        className="
          rounded-lg
          bg-slate-200
          px-4
          py-2
          font-semibold
          text-slate-900
          dark:bg-slate-700
          dark:text-white
  "
      >
        {currentPage}
      </span>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="
          rounded-lg
          bg-slate-800
          w-full
          px-5
          py-2
          sm:w-auto
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
