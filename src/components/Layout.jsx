import { Link, Outlet } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import useLibrary from "../hooks/useLibrary";
import ThemeToggle from "./ThemeToggle";

function Layout() {
  const { state } = useLibrary();
  const totalLibraryCount = state.watchlist.length + state.watched.length;

  return (
    <div
      className="
          min-h-screen 
          bg-slate-100 
          text-slate-900 
          transition-colors
          duration-300
          dark:bg-slate-900 
          dark:text-slate-100
        "
    >
      <header
        className="
          bg-slate-900
          text-white
          shadow-md
          transition-colors
          duration-300
          dark:bg-slate-950
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            gap-4
            px-4
            py-4
            sm:flex-row
            sm:justify-between
            sm:px-6
          "
        >
          <Link
            to={ROUTES.HOME}
            className="
              flex
              items-center
              gap-2
              text-2xl
              font-bold
              tracking-wide
              transition-colors
              hover:text-yellow-400
              sm:text-3xl
              "
          >
            <span>🍿</span>
            <span>PopcornIQ</span>
          </Link>

          <nav
            className="
              flex
              flex-wrap
              justify-center
              gap-4
              text-base
              font-medium
              sm:gap-8
              sm:text-lg
            "
          >
            <Link
              to="/"
              className="
                rounded-md
                px-2
                py-1
                transition-colors
                hover:text-yellow-400
                "
            >
              Browse
            </Link>

            <Link
              to={ROUTES.MY_LIST}
              className="
                rounded-md
                px-2
                py-1
                transition-colors
                hover:text-yellow-400
                "
            >
              {totalLibraryCount > 0
                ? `My List (${totalLibraryCount})`
                : "My List"}
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main
        className="
          mx-auto
          max-w-7xl
          px-4
          py-6
          sm:px-6
          sm:py-8
        "
      >
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
