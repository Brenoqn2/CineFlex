import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function HomePage(props) {
  const { setMovie } = props;
  const [movies, setMovies] = React.useState([]);
  const baseURL = "https://mock-api.driven.com.br/api/v5/cineflex/movies";

  React.useEffect(() => {
    const promise = axios.get(baseURL);
    promise.then((response) => {
      setMovies(response.data);
    });
  }, []);

  return (
    <main className="homePage">
      <p>Selecione o filme</p>
      <section>
        {movies.map((movie) => {
          return (
            <Link
              key={movie.title}
              to={`/sessoes/${movie.id}`}
              onClick={() => {
                setMovie(movie.id);
              }}
            >
              <figure>
                <img src={movie.posterURL} alt={movie.title} />
              </figure>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
