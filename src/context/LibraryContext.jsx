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
    case "ADD_TO_WATCHLIST": {
      const alreadyExists = state.watchlist.some(
        (movie) => movie.id === action.payload.id,
      );

      if (alreadyExists) {
        return state;
      }

      return {
        ...state,
        watchlist: [...state.watchlist, action.payload],
      };
    }

    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter(
          (movie) => movie.id !== action.payload,
        ),
      };

    default:
      return state;
  }
}

/* Provider component that will wrap the application. */
function LibraryProvider({ children }) {
  const [state, dispatch] = useReducer(libraryReducer, initialState);

  function addToWatchlist(movie) {
    dispatch({
      type: "ADD_TO_WATCHLIST",
      payload: movie,
    });
  }

  function removeFromWatchlist(movieId) {
    dispatch({
      type: "REMOVE_FROM_WATCHLIST",
      payload: movieId,
    });
  }

  return (
    <LibraryContext.Provider
      value={{
        state,
        addToWatchlist,
        removeFromWatchlist,
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
