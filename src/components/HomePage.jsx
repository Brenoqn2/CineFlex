import axios from "axios";
import React from "react";

export default function HomePage(props) {
  const { setMovie } = props;
  const [movies, setMovies] = React.useState([]);
  const baseURL = "https://mock-api.driven.com.br/api/v5/cineflex/movies";

  React.useEffect(() => {
    const promise = axios.get(baseURL);
    promise.then((response) => {
      setMovies(response.data);
      console.log(response);
    });
  }, []);

  return (
    <main className="homePage">
      <p>Selecione o filme</p>
      <section>
        {movies.map((movie) => {
          return (
            <figure key={movie.title}>
              <img src={movie.posterURL} alt={movie.title} />
            </figure>
          );
        })}
      </section>
    </main>
  );
}
