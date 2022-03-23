import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import MovieSessions from "./components/MovieSessions";
import React from "react";

export default function App() {
  const [movieID, setMovieID] = React.useState(0);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage setMovie={setMovieID} />} />
        <Route
          path={`/sessoes/${movieID}`}
          element={<MovieSessions id={movieID} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
