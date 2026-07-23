import { useEffect, useState } from "react";

// Browse page pagination controls.
function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageChange,
}) {
  const [pageInput, setPageInput] = useState(currentPage);

  useEffect(() => {
    setPageInput(currentPage);
  }, [currentPage]);

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
          sm:w-24
          px-5
          py-2
          text-white
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        Previous
      </button>

      <input
        type="number"
        value={pageInput}
        className="
            w-16
            rounded-lg
            bg-slate-200
            px-2
            py-2
            text-center
            font-semibold
            text-slate-900
            dark:bg-slate-700
            dark:text-white
          "
        onChange={(event) => {
          setPageInput(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            let page = Number(pageInput);
            if (Number.isNaN(page)) {
              return;
            }
            const maxPage = Math.min(totalPages, 500);
            page = Math.max(1, Math.min(page, maxPage));

            setPageInput(page);
            onPageChange(page);
          }
        }}
      />

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="
          rounded-lg
          bg-slate-800
          w-full
          sm:w-24
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
