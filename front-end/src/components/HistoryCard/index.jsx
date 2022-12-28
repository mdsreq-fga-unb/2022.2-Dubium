import "./style.css";

export default function HistoryCard(props) {
  return (
    <li className="history-card-container">
      <img src={props.profilePicture} alt="" />
      <span>{props.name}</span>
    </li>
  );
}
