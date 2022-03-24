import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import MovieSessions from "./components/MovieSessions";
import React from "react";
import SeatsPage from "./components/SeatsPage";

export default function App() {
  const [movieID, setMovieID] = React.useState(0);
  const [sessionID, setSessionID] = React.useState(0);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage setMovie={setMovieID} />} />
        <Route
          path={`/sessoes/${movieID}`}
          element={<MovieSessions id={movieID} setSessionID={setSessionID} />}
        />
        <Route
          path={`/assentos/${sessionID}`}
          element={<SeatsPage id={sessionID} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
