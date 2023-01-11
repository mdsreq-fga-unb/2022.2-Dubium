export default function handleCurso(curso) {
    let nomeCurso;

    switch (curso) {
      case 1:
        nomeCurso = "Engenharias";
        break;
      case 2:
        nomeCurso = "Engenharia Aeroespacial";
        break;
      case 3:
        nomeCurso = "Engenharia Automotiva";
        break;
      case 4:
        nomeCurso = "Engenharia Eletrônica";
        break;
      case 5:
        nomeCurso = "Engenharia de Energia";
        break;
      case 6:
        nomeCurso = "Engenharia Software";
        break;

      default:
        break;
    }

    return nomeCurso;
  }