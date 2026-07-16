import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Browse from "./pages/Browse";
import MovieDetails from "./pages/MovieDetails";
import MyList from "./pages/MyList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Browse />} />
        <Route path="movie/:id" element={<MovieDetails />} />
        <Route path="my-list" element={<MyList />} />
      </Route>
    </Routes>
  );
}

export default App;
