import React from "react";
import axios from "axios";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function SeatsPage(props) {
  const { id, setMovie, setDate, setHour, setSeats, setCpf, setName } = props;
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
    const baseURL = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${id}/seats`;
    const promise = axios.get(baseURL);
    promise.then((response) => {
      setSession(response.data);
    });
  }, [id]);

  const [userName, setUserName] = React.useState("");
  const [CPF, setCPF] = React.useState("");

  function getName(event) {
    setUserName(event.target.value);
  }

  function getCPF(event) {
    setCPF(event.target.value);
  }

  function sendInfo() {
    const seatsIDs = chosenSeats.filter((element) => element !== null);
    const object = { ids: [...seatsIDs], name: userName, cpf: CPF };
    const promise = axios.post(
      "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many",
      object
    );
    promise.then();
    setMovie(session.movie.title);
    setDate(session.day.date);
    setHour(session.name);
    let chosenSeatsNumber = [];
    for (let i = 0; i < session.seats.length; i++) {
      for (let j = 0; j < chosenSeats.length; j++) {
        if (session.seats[i].id === chosenSeats[j]) {
          chosenSeatsNumber.push(session.seats[i].name);
        }
      }
    }
    setSeats(chosenSeatsNumber);
    setCpf(CPF);
    setName(userName);
  }

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
        <div className="seats-example">
          <div className="seat-example">
            <div className="circle chosen"></div>
            <p>Selecionado</p>
          </div>
          <div className="seat-example">
            <div className="circle available"></div>
            <p>Disponível</p>
          </div>
          <div className="seat-example">
            <div className="circle unavailable"></div>
            <p>Indisponível</p>
          </div>
        </div>
        <section className="inputs-seats-page">
          <p>Nome do comprador:</p>
          <input
            type="text"
            placeholder="Digite seu nome..."
            onChange={getName}
          ></input>
          <p>CPF do comprador:</p>
          <input
            type="text"
            placeholder="Digite seu CPF..."
            onChange={getCPF}
          ></input>
        </section>
        <div className="btn-container">
          <Link to="/sucesso" onClick={sendInfo}>
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
