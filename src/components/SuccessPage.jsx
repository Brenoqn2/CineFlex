import { Link } from "react-router-dom";
export default function SuccessPage(props) {
  const { movie, date, hour, seats, cpf, name } = props;
  return (
    <main className="success-page">
      <h1>
        Pedido feito
        <br />
        com sucesso!
      </h1>
      <h2>Filme e sessão</h2>
      <p>
        {movie}
        <br />
        {`${date} ${hour}`}
      </p>
      <h2>Ingressos</h2>
      {seats.map((seat) => {
        return <p key={"seat" + seat}>Assento {seat}</p>;
      })}
      <h2>Comprador</h2>
      <p>
        Nome: {name}
        <br />
        CPF: {cpf}
      </p>
      <div className="btn-container">
        <Link to="/">
          <button>Voltar para Home</button>
        </Link>
      </div>
    </main>
  );
}
