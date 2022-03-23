import React from "react";
import axios from "axios";

export default function MovieSessions(props) {
  //   const { id } = props;
  const id = 0;
  const baseURL = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`;
  const [sessions, setSessions] = React.useState([]);

  React.useEffect(() => {
    const promise = axios.get(baseURL);
    promise.then((response) => {
      setSessions(response.data);
    });
  }, []);

  return (
    <main className="movie-sessions">
      <p>Selecione o horário</p>
      <section>
        {sessions.days.map((session) => {
          const date = session.weekday + " - " + session.date;
          return (
            <div className="session">
              <p>{date}</p>
              <div className="showtimes">
                {session.showtimes.map((showtime) => {
                  return <button>{showtime.name}</button>;
                })}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
