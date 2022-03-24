import React from "react";
import axios from "axios";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function SeatsPage(props) {
  const { id } = props;
  const baseURL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`;
  const [session, setSession] = React.useState({
    seats: [],
    movie: [],
    day: [],
  });
  const [chosenSeats, setChosenSeat] = React.useState([]);

  function chooseSeat(seat) {
    if (!chosenSeats.includes(seat)) {
      setChosenSeat([...chosenSeats, seat]);
    } else {
      const removeIndex = chosenSeats.indexOf(seat);
      const arr = chosenSeats.map((element, index) =>
        index !== removeIndex ? element : null
      );
      setChosenSeat([...arr]);
    }
  }

  React.useEffect(() => {
    const promise = axios.get(baseURL);
    promise.then((response) => {
      setSession(response.data);
    });
  }, []);

  return (
    <>
      <main className="seats-page">
        <p>Selecione o(s) assento(s)</p>
        <section className="seats">
          <div>
            {session.seats.map((seat) => {
              const status =
                seat.isAvailable === true ? "available" : "unavailable";
              return status === "available" ? (
                <div
                  key={seat.id}
                  className={`seat ${
                    chosenSeats.includes(seat.id) ? "chosen" : status
                  } `}
                  onClick={() => {
                    chooseSeat(seat.id);
                  }}
                >
                  <p>{seat.name}</p>
                </div>
              ) : (
                <div key={seat.id} className={`seat ${status}`}>
                  <p>{seat.name}</p>
                </div>
              );
            })}
          </div>
        </section>
        <section className="inputs-seats-page">
          <p>Nome do comprador:</p>
          <input type="text" placeholder="Digite seu nome..."></input>
          <p>CPF do comprador:</p>
          <input type="text" placeholder="Digite seu CPF..."></input>
        </section>
        <div className="btn-container">
          <Link to="/">
            <button>Reservar assento(s)</button>
          </Link>
        </div>
      </main>
      <Footer
        img={session.movie.posterURL}
        title={session.movie.title}
        time={`${session.day.weekday} - ${session.name}`}
      />
    </>
  );
}
