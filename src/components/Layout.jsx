import { Link, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/routes";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to={ROUTES.HOME}
            className="text-3xl font-bold tracking-wide hover:text-yellow-400 transition-colors"
          >
            <span>🍿</span>
            <span>PopcornIQ</span>
          </Link>

          <nav className="flex gap-8 text-lg font-medium">
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              Browse
            </Link>

            <Link
              to="/my-list"
              className="hover:text-yellow-400 transition-colors"
            >
              My List
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
