import { useContext } from "react";
import { LibraryContext } from "../context/library-context";

/* Custom hook for consuming the library context. */
function useLibrary() {
  //"value" defined in LibraryContext.Provider
  const context = useContext(LibraryContext);

  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider.");
  }

  //returning state(watched,watchlist) and dispatch actions list
  return context;
}

export default useLibrary;
