import "./style.css";
import moca from "../../assets/images/search-sem-fundo.png";
import bichinho from "../../assets/images/question-sem-fundo.png";


export default function About() {
  return (
    <div>
    <div className="dubium">
      <img src={moca} alt="moca" className="imagem"/>
      <ul className="texto">
        <h1>O QUE É O DUBIUM</h1>
        <p/>
        <p>
          O Dubium é um produto que visa o auxílio acadêmico aos alunos da FGA, focado em ajudá-los / dar suporte para o desenvolvimento acadêmico - sanando as dúvidas de estudo - em temas específicos das matérias. Gerando assim autonomia e abrangência de conhecimentos, sem obrigatoriedade por partes dos estudantes voluntários.
        </p>
      </ul>
    </div>
    <div className="dubium">
    <ul className="texto">
        <h1>SOBRE O DUBIUM</h1>
        <p/>
        <p>
          texto
        </p>
      </ul>
      <img src={bichinho} alt="bichinho" className="imagem"/>
    </div>
    </div>
  );
}
