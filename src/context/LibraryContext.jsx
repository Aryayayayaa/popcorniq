import { createContext, useContext, useReducer } from "react";

/**
 * Global context for the user's movie library.
 * This context will eventually store the watchlist,
 * watched movies, personal ratings, and related actions.
 */
const LibraryContext = createContext(null);
const initialState = {
  watchlist: [],
  watched: [],
};

function libraryReducer(state, action) {
  switch (action.type) {
    default:
      return state;
  }
}

/* Provider component that will wrap the application. */
function LibraryProvider({ children }) {
  const [state, dispatch] = useReducer(libraryReducer, initialState);
  return (
    <LibraryContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

/* Custom hook for consuming the library context. */
function useLibrary() {
  const context = useContext(LibraryContext);

  if (!context) {
    throw new Error("useLibrary must be used within a LibraryProvider.");
  }

  return context;
}

export { LibraryProvider, useLibrary };
