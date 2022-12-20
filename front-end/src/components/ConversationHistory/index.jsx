import "./style.css";
import HistoryCard from "../HistoyCard";
import { userData } from "./data";

export default function ConversationHistory() {
  return (
    <ul className="converstation-history-container">
      {userData.map((data) => (
        <HistoryCard profilePicture={data.profilePicture} name={data.name} />
      ))}
    </ul>
  );
}
