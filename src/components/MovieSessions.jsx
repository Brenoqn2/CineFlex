import React from "react";
import axios from "axios";
import Footer from "./Footer";

export default function MovieSessions(props) {
  const { id } = props;
  const baseURL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`;
  const [sessions, setSessions] = React.useState({ days: [] });

  React.useEffect(() => {
    const promise = axios.get(baseURL);
    promise.then((response) => {
      setSessions(response.data);
    });
  }, []);

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
                      <button key={date + showtime.name}>
                        {showtime.name}
                      </button>
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
