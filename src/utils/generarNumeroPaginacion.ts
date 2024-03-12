export const generarNumeroPaginacion = (
  paginaActual: number,
  totalPages: number
) => {
  //Si el numero total de paginas es de 7 o menos vamos a mostrar todas las paginas sin numeros suspensivos
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1); // [1,2,3,4,5,6,7]
  }

  // Si las paginas actual esta en las primeras 3 paginas, mostar las primeras 3, ... y las ultimas 2
  if (totalPages <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // Si la pagina actual esta entre las ultimas 3 paginas, mostrar las primeras 2 y las ultimas 3
  if (totalPages >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // Si la página actual esta en otro lugar (en el medio por ej), mostrar la primera pagina, ... ,pagina actual y vecinos
  return [
    1,
    "...",
    paginaActual - 1,
    paginaActual,
    paginaActual + 1,
    "...",
    totalPages,
  ];
};
