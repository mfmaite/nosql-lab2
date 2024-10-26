import { Registro } from '../types/registro';
import dayjs from 'dayjs';

const orderByDate = (registros: Registro[]) => {
  return Object.values(registros).sort((a, b) => {
    const dateA = dayjs(a.createdAt);
    const dateB = dayjs(b.createdAt);
    return dateB.diff(dateA);
  });
}

export { orderByDate };
