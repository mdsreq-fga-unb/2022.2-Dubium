export default function pesquisaPosts(array, item) {
    const avisosFiltrados = array.filter(
        (e) =>
          e.filtro
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .startsWith(
                item
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            ) ||
          // eslint-disable-next-line eqeqeq
          e.filtro
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase() ==
            item
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .toLowerCase()
      );

      return avisosFiltrados;
}