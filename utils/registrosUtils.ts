import { Registro } from '../types/registro.js';
import dayjs from 'dayjs';

const orderByDate = (registros: Registro[]) => {
  return Object.values(registros).sort((a, b) => {
    const dateA = dayjs(a.createdAt);
    const dateB = dayjs(b.createdAt);
    return dateB.diff(dateA);
  });
}

function paginarDatos(data: any[], pagina: number, tamanoPagina: number): any[] {
  const inicio = (pagina - 1) * tamanoPagina;
  const fin = inicio + tamanoPagina;
  return data.slice(inicio, fin);
}

export { orderByDate, paginarDatos };
