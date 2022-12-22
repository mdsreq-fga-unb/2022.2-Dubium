import { useState } from "react";
import ForumBody from "./ForumBody";
import { perguntasData } from "./data.js";
import "./style.css";
import Sidebar from "./Sidebar";

export default function Forum() {
  const [perguntas, setPerguntas] = useState(perguntasData);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <div className="container-forum">
        <ForumBody perguntas={perguntas} />
      </div>
    </div>
  );
}
