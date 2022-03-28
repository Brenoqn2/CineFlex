import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import MovieSessions from "./components/MovieSessions";
import React from "react";
import SeatsPage from "./components/SeatsPage";
import SuccessPage from "./components/SuccessPage";

// movie, date, hour, seats, cpf, name

export default function App() {
  const [movieID, setMovieID] = React.useState(0);
  const [sessionID, setSessionID] = React.useState(0);
  const [movie, setMovie] = React.useState("");
  const [date, setDate] = React.useState("");
  const [hour, setHour] = React.useState("");
  const [seats, setSeats] = React.useState([]);
  const [cpf, setCpf] = React.useState("");
  const [name, setName] = React.useState("");

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
          element={
            <SeatsPage
              id={sessionID}
              setMovie={setMovie}
              setDate={setDate}
              setHour={setHour}
              setSeats={setSeats}
              setCpf={setCpf}
              setName={setName}
            />
          }
        />
        <Route
          path="/sucesso"
          element={
            <SuccessPage
              movie={movie}
              date={date}
              hour={hour}
              seats={seats}
              cpf={cpf}
              name={name}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
