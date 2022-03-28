import React from "react";
import axios from "axios";
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function MovieSessions(props) {
  const { id, setSessionID } = props;
  const [sessions, setSessions] = React.useState({ days: [] });

  React.useEffect(() => {
    const baseURL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`;
    const promise = axios.get(baseURL);
    promise.then((response) => {
      setSessions(response.data);
    });
  }, [id]);

  return (
    <>
      <main className="movie-sessions">
        <p>Selecione o horário</p>
        <section>
          {sessions.days.map((session) => {
            const date = session.weekday + " - " + session.date;
            return (
              <div className="session" key={date}>
                <p>{date}</p>
                <div className="showtimes">
                  {session.showtimes.map((showtime) => {
                    return (
                      <Link
                        onClick={() => {
                          setSessionID(showtime.id);
                        }}
                        key={date + showtime.name}
                        to={`/assentos/${showtime.id}`}
                      >
                        <button>{showtime.name}</button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <Footer img={sessions.posterURL} title={sessions.title} />
    </>
  );
}
