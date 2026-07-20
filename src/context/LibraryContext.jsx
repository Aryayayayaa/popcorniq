import { createContext, useContext, useEffect, useReducer } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

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

    case "ADD_TO_WATCHED": {
      const alreadyExists = state.watched.some(
        (movie) => movie.id === action.payload.id,
      );

      if (alreadyExists) {
        return state;
      }

      return {
        ...state,
        watched: [
          ...state.watched,
          {
            ...action.payload,
            userRating: 0,
          },
        ],
      };
    }

    case "REMOVE_FROM_WATCHED":
      return {
        ...state,
        watched: state.watched.filter((movie) => movie.id !== action.payload),
      };

    case "SET_USER_RATING":
      return {
        ...state,
        watched: state.watched.map((movie) =>
          movie.id === action.payload.id
            ? {
                ...movie,
                userRating: action.payload.rating,
              }
            : movie,
        ),
      };

    default:
      return state;
  }
}

/* Provider component that will wrap the application. */
function LibraryProvider({ children }) {
  const [savedState, setSavedState] = useLocalStorage(
    "movie-library",
    initialState,
  );

  //reducer here is libraryReducer
  const [state, dispatch] = useReducer(libraryReducer, savedState);

  useEffect(() => {
    setSavedState(state);
  }, [state, setSavedState]);

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

  function addToWatched(movie) {
    dispatch({
      type: "ADD_TO_WATCHED",
      payload: movie,
    });
  }

  function removeFromWatched(movieId) {
    dispatch({
      type: "REMOVE_FROM_WATCHED",
      payload: movieId,
    });
  }

  function setUserRating(id, rating) {
    dispatch({
      type: "SET_USER_RATING",
      payload: {
        id,
        rating,
      },
    });
  }

  return (
    <LibraryContext.Provider
      value={{
        state,
        addToWatchlist,
        removeFromWatchlist,
        addToWatched,
        removeFromWatched,
        setUserRating,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

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

export { LibraryProvider, useLibrary };
