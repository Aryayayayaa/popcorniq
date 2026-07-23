import { Link } from "react-router-dom";
import { Home } from "lucide-react";

import { ROUTES } from "../constants/routes";

function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-extrabold text-blue-600">404</h1>

      <h2 className="mt-4 text-3xl font-bold">Page Not Found</h2>

      <p className="mt-3 max-w-md text-slate-600 dark:text-slate-300">
        Sorry, the page you're looking for doesn't exist or may have been moved.
      </p>

      <Link
        to={ROUTES.HOME}
        className="
          mt-8
          inline-flex
          items-center
          gap-2
          rounded-lg
          bg-blue-600
          px-6
          py-3
          text-white
          transition
          hover:bg-blue-700
        "
      >
        <Home size={18} />
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
