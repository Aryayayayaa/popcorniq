import Skeleton from "./Skeleton";

function MovieDetailsSkeleton() {
  return (
    <section className="mx-auto max-w-6xl">
      {/* Navigation Buttons */}
      <div className="mb-8 flex gap-4">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-24" />
      </div>

      {/* Backdrop */}
      <Skeleton className="mb-8 h-80 w-full rounded-xl" />

      <div className="grid gap-10 md:grid-cols-2">
        {/* Poster */}
        <Skeleton className="h-[650px] w-full rounded-xl" />

        {/* Details */}
        <div>
          <Skeleton className="h-12 w-3/4" />

          <div className="mt-6 flex gap-6">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-28" />
          </div>

          <div className="mt-5 flex gap-2">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>

          <div className="mt-6 flex gap-4">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-48" />
          </div>

          <div className="mt-8 space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>

          <div className="mt-10">
            <Skeleton className="mb-5 h-8 w-40" />

            <div className="flex items-center gap-4">
              <Skeleton className="h-20 w-20 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Skeleton className="mb-5 h-8 w-40" />

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="text-center">
                  <Skeleton className="mx-auto h-24 w-24 rounded-full" />
                  <Skeleton className="mx-auto mt-3 h-4 w-20" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Skeleton className="mb-5 h-8 w-40" />

            <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="text-center">
                  <Skeleton className="mx-auto h-32 w-32 rounded-full" />
                  <Skeleton className="mx-auto mt-3 h-4 w-20" />
                  <Skeleton className="mx-auto mt-2 h-3 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetailsSkeleton;
