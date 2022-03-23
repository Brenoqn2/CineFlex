export default function Footer(props) {
  const { img, title, time = "" } = props;

  return (
    <footer>
      <div className="img-container">
        <img src={img} />
      </div>
      <div className="textWrapper">
        <p>{title}</p>
        <p>{time}</p>
      </div>
    </footer>
  );
}
