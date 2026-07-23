import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Browse from "./pages/Browse";
import MovieDetails from "./pages/MovieDetails";
import MyList from "./pages/MyList";
import NotFound from "./pages/NotFound";

//Routes: dict of the URLs -> check all roots and renders which matches the "path"

//Route: "If the URL looks like this, show this component."
//here, "Layout" is parent root -> has children inside it (Navbar, Outlet(child pages/content))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* if URL ends with '/' -> show Browse = Navbar + Browse Movies (content/outlet)*/}
        <Route index element={<Browse />} />

        <Route path="movie/:id" element={<MovieDetails />} />
        <Route path="my-list" element={<MyList />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
